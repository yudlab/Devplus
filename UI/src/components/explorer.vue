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
                    <i @click="explorerReload" class="fas fa-redo"></i>
                    <input v-model="navAddress"
                           class="navAddress"
                           type="text" >
                </div>
                <div class="explorer-container">
                    <div class="box file"><i class="fas fa-file"></i>filewdqwwdwdwefef</div>
                    <div class="box folder"><i class="fas fa-folder"></i>folderadwdwedede</div>
                    <div class="box file"><i class="fas fa-file"></i>filewdqwwdwdwefef</div>
                    <div class="box folder"><i class="fas fa-folder"></i>folderadwdwedede</div>
                    <div class="box file"><i class="fas fa-file"></i>filewdqwwdwdwefef</div>
                    <div class="box folder"><i class="fas fa-folder"></i>folderadwdwedede</div>
                    <div class="box file"><i class="fas fa-file"></i>filewdqwwdwdwefef</div>
                    <div class="box folder"><i class="fas fa-folder"></i>folderadwdwedede</div>
                    <div class="box file"><i class="fas fa-file"></i>filewdqwwdwdwefef</div>
                    <div class="box folder"><i class="fas fa-folder"></i>folderadwdwedede</div>
                    <div class="box file"><i class="fas fa-file"></i>filewdqwwdwdwefef</div>
                    <div class="box folder"><i class="fas fa-folder"></i>folderadwdwedede</div>
                    <div class="box file"><i class="fas fa-file"></i>filewdqwwdwdwefef</div>
                    <div class="box folder"><i class="fas fa-folder"></i>folderadwdwedede</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      cmpid: 'nl_test_20190101',
      navAddress: window.cwd
    }
  },
  methods: {
      open (){
          $('#__explorer').css('display', 'block')
          $('#_explorer').css('display', 'none')
      },
      close(){
        $('#__explorer').css('display', 'none')
        $('#_explorer').css('display', 'block')
      }
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
        border: 1px solid #000000;
        display: none;
        width: 96%;
        height: 100%;
        background-color: #34495e;
        border: 2px solid #3498db;
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
                margin-bottom: 15px;
                input {
                    margin: 0 36px 0 21px; 
                    border: 2px solid #3498db;
                    background-color: #34495e;
                    border-radius: 5px;
                    height: 40px;
                    border-radius: 5px;
                    width: 612px;
                    padding-left: 10px;
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
            }
            .explorer-container {
                margin: 36px 0 0 20px;
                border-radius: 5px;
                height: 604px;
                width: 98.6%;
                overflow-y: scroll;

                &::-webkit-scrollbar-track  {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    background-color: #34495e;
                }

                &::-webkit-scrollbar {
                    width: 4px;
                    background-color: #2c3e50;
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
