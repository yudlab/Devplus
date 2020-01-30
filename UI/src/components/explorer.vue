<template>
    <div id="explorer">
        <div id="_explorer">
            <div class="close" @click="open()"><i class="fas fa-folder-open"></i></div>
        </div>
        <div id="__explorer">
            <div class="close" @click="close()"><i class="fas fa-times-circle"></i></div>
            <div class="explorer_contents">
                <div class="file-man-bar">
                    <i @click="explorerBack" class="fas fa-angle-left"></i>
                    <i @click="scanDir(navAddress)" class="fas fa-redo"></i>
                    <input v-model="navAddress"
                           class="navAddress"
                           type="text" >
                </div>
                <div id="explorer-container" class="explorer-container">
                    <div class="box"><i class="fas fa-file"></i>xxxxxxxa</div>
                    <div class="box"><i class="fas fa-file"></i>xxxxxxxa</div>
                    

                </div>
            <div id="explorerStatus"></div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      cmpid: 'nl_test_20190101',
      navAddress: 'C:\\',
      data: {},
    }
  },
  methods: {
    scanDir(dir) {
    $('#explorerStatus').html('sending request...')
    let _this = this
    if (dir) {
        $.ajax({
        type: 'POST',
        // make sure you respect the same origin policy with this url:
        // http://en.wikipedia.org/wiki/Same_origin_policy
        url: 'http://127.0.0.1:3000/getpath',
        data: {
            dir,
        },
        success(msg) {
            console.log('Res from AJAX: ', msg)
            console.log('dir @ scanDir(dir): ', dir)
            switch (msg) {
            case '-4048':
                $('#explorer-container').html("Access denied.")
                break
            case '-4058':
                $('#explorer-container').html("Not found.")
                break
            case '[]':
                $('#explorer-container').html("Empty directory.")
                break
            default:
                console.log(msg)
                msg = JSON.parse(msg)
                if(typeof msg == 'object' || typeof msg == 'array') {
                    var data = ""
                    console.log("isObj")
                    msg.forEach(e => {
                        var filename = e[1].replace(_this.navAddress, "")
                        console.log(filename)
                        switch(e[0]) {
                            case 'file':
                                var icon = "file-alt"
                                break
                            case 'folder':
                                var icon = "folder"
                                break
                            default:
                                var icon = "file"
                        }
                        window.expdata += `<div class="box" @click="scanDir('${e[1]}')"><i class="fas fa-${icon}"></i>${filename}</div>`
                    });
                    $('#explorer-container').html(data)
                    $('#explorerStatus').html('Completed.')
                    return;
                }
                console.log(typeof msg)
                console.log("!Obj ->", msg)
                $('#explorerStatus').html('Error')
            }
        },
        })
    } else {
        console.log('No path defined @ scanDir().')
        $('#explorerStatus').html('Empty path')
        }
    },
    open (){
        $('#__explorer').css('display', 'block')
        $('#_explorer').css('display', 'none')
    },
    close(){
        $('#__explorer').css('display', 'none')
        $('#_explorer').css('display', 'block')
    },
    explorerBack(){

    },
  },
}
</script>

<style lang="scss" scoped>
#explorer {
    .container {
        .close {
            color: #000000;
            font-size: 14px;
            text-decoration: underline;
        }
    }
    #_explorer{
        .close {
            .fa-folder-open {
                padding: 20px;
            }
        }
    }
    #__explorer{
        display: none;
        width: 96%;
        height: 100%;
        background: rgb(44,62,80);
        background: linear-gradient(185deg, rgba(44,62,80,1) 0%, rgba(89,102,103,1) 0%, rgba(72,89,99,1) 33%, rgba(52,73,94,1) 100%);
        margin: 20px;

        i {
            color: #FFFFFF;
        }
        .close {
            .fa-times-circle {
                padding: 20px;
                color: #FFFFFF;
            }
        }

        .explorer_contents {
         
            margin: 15px;
            .file-man-bar {
                position: absolute;
                margin: 15px 0;
                input {
                    margin: 0 36px 0 21px; 
                    //border: 2px solid #3498db;
                    border: none;
                    background-color: #34495e;
                    border-radius: 5px;
                    height: 40px;
                    border-radius: 5px;
                    width: 612px;
                    padding-left: 10px;
                    font-family: brownprolight, sans-serif;
                    color:#FFFFFF;
                }
                i {
                    padding-left: 15px;
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                    color: #ffffff;
                    font-size: 15px;
                    cursor: pointer;
                }
                .navAddress {
                    background: rgb(44,62,80);
                    background: linear-gradient(199deg, rgba(44,62,80,1) 0%, rgba(89,102,103,1) 0%, rgba(72,89,99,1) 33%, rgba(52,73,94,1) 100%);
                }
            }
            .explorer-container {
                margin: 12px 0 0 20px;
                border-radius: 5px;
                height: 604px;
                width: 98.6%;
                overflow-y: scroll;
                display: inline-block;

                &::-webkit-scrollbar-track  {
                    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    // box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    // background-color: #34495e;
                    -webkit-box-shadow: none;
                    box-shadow: none;
                    background-color: transparent;
                }

                &::-webkit-scrollbar {
                    width: 4px;
                    background-color: transparent;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #3498db;	
                    background-image: -webkit-linear-gradient(45deg,
                    rgba(255, 255, 255, .2) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, .2) 50%,
                    rgba(255, 255, 255, .2) 75%,
                    transparent 75%,
                    transparent);
                    border-radius: 5px;
                }

                .box {
                    margin: 9px;
                    height: 35px;
                    width: 200px;
                    font-size: 14px;
                    display: flex;
                    justify-content: center;
                    align-content: center;

                    i {
                        padding-right: 13px;
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>
