<template>
    <div id="explorer">
        <div id="_explorer">
            <div class="close" @click="open()"><i class="fas fa-folder-open"></i></div>
        </div>
        <div id="__explorer">
            <div class="close" @click="close()"><i class="fas fa-times-circle"></i></div>
            <div class="explorer_contents">
                <div class="file-man-bar">
                    <i @click="backNav" class="fas fa-angle-left"></i>
                    <i @click="scanDir(navAddress)" class="fas fa-redo"></i>
                    <input v-model.lazy="navAddress"
                           class="navAddress"
                           type="text" >
                </div>
                <div  id="explorer-container"
                      class="explorer-container">

                    <div class="box animated fadeIn delay-.5s"
                         v-bind:key="a"
                         v-for="(b, a) in data"
                         @click="openHandler(b[0], b[1])"
                         :disabled="(b[0]=='file')?'':'disabled'">
                        <i class="fas"
                           :class="(b[0]=='file'||b[0]=='folder')?(b[0]=='file')?'fa-file-alt':'fa-folder':'fa-file'"></i>{{b[1].replace(navAddress+'\\', '')}}
                    </div>

                </div>
            <div id="explorerStatus">Idle</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      cmpid: 'nl_test_20190101',
      navAddressArr: 'C:\\',
      navAddress: 'C:\\www',
      editorFile: '',
      data: {}
    }
  },
  methods: {
    fetchExports(e) {
        if(''!==e&&undefined!==e){
            var _this = this
            $.ajax({
                type: 'POST',
                // make sure you respect the same origin policy with this url:
                // http://en.wikipedia.org/wiki/Same_origin_policy
                url: 'http://127.0.0.1:3000/read-exports',
                contentType: 'application/json',
                data: JSON.stringify({
                data: {
                    path: e,
                },
                }),
                success(msg) {
                _this.$emit('loadContent', msg)
                },
            })
        }
    },
    scanDir(dir) {
    let _this = this
    $('#explorerStatus').html('sending request...')
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
                $('#explorerStatus').html("Access denied.")
                break
            case '-4058':
                $('#explorerStatus').html("Not found.")
                break
            case '[]':
                $('#explorerStatus').html("Empty directory.")
                break
            default:
                console.log(msg)
                msg = JSON.parse(msg)
                if(typeof msg == 'object' || typeof msg == 'array') {
                    _this.navAddress = dir
                    _this.data = msg
                    $('#explorerStatus').html('Completed.')
                    return;
                }
                console.log(typeof msg)
                console.log("!Obj ->", msg)
                $('#explorerStatus').html('Endpoint Error')
            }
        },
        })
    } else {
        console.log('No path defined @ scanDir().')
        $('#explorerStatus').html('Empty path')
        }
    },
    open (){
        $('#explorer').css('width', '60%')
        $('#__explorer').css('display', 'block')
        $('#_explorer').css('display', 'none')
        this.scanDir(this.updatePath())
    },
    close(){
        $('#explorer').css('width', '0')
        $('#__explorer').css('display', 'none')
        $('#_explorer').css('display', 'block')
    },
    openHandler(e, x){
        console.log(e)
        if(e =='file'){
            this.fetchExports(x)
            this.editorFile = x
            this.close()
        } else if(e=='folder'){
            this.scanDir(x)
        } else {
            $('#explorerStatus').html('Can\'t open file: ',e)
        }
        
    },
    backNav(){
        var navDirArray = this.navAddress.split('\\')
        
        if(typeof navDirArray == 'object' && navDirArray.length>1){
            console.log(navDirArray)
            if(navDirArray.length=="2"){
                navDirArray.pop()
                navDirArray += "\\"
                this.scanDir(navDirArray)
                return
            }
            navDirArray.pop()
            navDirArray = navDirArray.join('\\')
            this.scanDir(navDirArray)
        }
    },
    updatePath(){
        var e = sessionStorage.getItem('newsPath')
        if( "undefined" !== e || "" !== e ){
            return e
        } else {
            return this.navAddress
        }
    },
  },
  watch: {
      navAddress (){
          this.scanDir(this.navAddress)
      },
      editorFile () {
          sessionStorage.setItem( 'editorFile', this.editorFile )
      }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
#explorerStatus {
    letter-spacing: 1.5px;
    font-size: 12px;
    text-transform: uppercase;
}
#explorer { 
    height: 82vh;
    width: 0;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    z-index: 99;

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
         height: 80vh;
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
                height: 82%;
                width: 98.6%;
                overflow-y: scroll;
                display: inline-block;
    
                scrollbar-width: thin;
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
                    cursor: pointer;
                    margin: 9px;
                    height: 35px;
                    font-size: 14px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    i {
                        padding: 0 13px;
                        font-size: 20px;
                    }

                    &:hover {
                        background-color: #3498db;
                    }
                }
            }
        }
    }
}
</style>
