<template>
    <div id="explorer">
        <div id="__explorer">
            <div class="explorer_contents">
                <div class="file-man-bar">
                    <i @click="backNav" class="fas fa-angle-left"></i>
                    <i @click="scanDir(navAddress)" class="fas fa-redo"></i>
                    <input v-model.lazy="navAddress"
                           class="navAddress"
                           type="text" >
                    <div id="explorerStatus">Idle</div>       
                </div>
                <div  id="explorer-container"
                      class="explorer-container">
                    <div class="box animated fadeIn delay-.5s"
                         v-bind:key="a"
                         v-for="(b, a) in data">
                        <input v-if="b[0]=='folder'||b[0]=='file'"
                               :checked="(ftpData.includes(b[1]))?'checked':''"
                               type="checkbox"
                               :value="b[1]"
                               @change="fileSelection"
                               class="ftpCheck"/>
                        <i class="fas"
                           @click="openHandler(b[0], b[1])"
                           :class="(b[0]=='file'||b[0]=='folder')?(b[0]=='file')?'fa-file-alt':'fa-folder':'fa-file'">
                           <div>{{b[1].replace(navAddress+'\\', '')}}</div>
                        </i>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'explorer',
  data() {
    return {
      cmpid: 'nl_test_20190101',
      navAddressArr: 'C:\\',
      navAddress: 'C:\\www',
      editorFile: '',
      data: {},
      ftpData: []
    }
  },
  methods: {
    fileSelection($event){
        console.log($event.target.checked)
        console.log($event.target.value)
        console.log(this.ftpData)
        switch($event.target.checked){
            case true:
                (this.ftpData.includes($event.target.value))?console.log('on list'):this.ftpData.push($event.target.value)
                break
            case false:
            default:
                (!this.ftpData.includes($event.target.value))?console.log('not on list'):this.ftpData.splice( this.ftpData.indexOf($event.target.value), 1 )
        }
    },
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
        $('#explorer').css('width', '100%')
        $('#__explorer').css('display', 'block')
        this.scanDir(this.updatePath())
    },
    close(){
        $('#explorer').css('width', '0')
        $('#__explorer').css('display', 'none')

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
      },
      toggleExplorer (){
          (this.toggleExplorer)?this.close():this.open();
      }
  },
  mounted () {
  },
  props: {
      toggleExplorer : {
          type: Boolean,
          default: false
      }
  }
}
</script>

<style lang="scss" scoped>

#explorer { 
    height: 100%;
    width: 0;
    position: fixed;
    top: 5rem;
    left: 0;
    color: white;
    z-index: 99;

    .container {
        .close {
            color: #000000;
            font-size: 14px;
            text-decoration: underline;
        }
    }

    #__explorer{
        display: none;
        width: 99vw;
        height: 100%;
        background: rgb(44,62,80);
        background: linear-gradient(185deg, rgba(44,62,80,1) 0%, rgba(89,102,103,1) 0%, rgba(72,89,99,1) 33%, rgba(52,73,94,1) 100%);
        padding: 20px 20px 20px;

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
         height: 90%;
            margin: 0 15px 15px;
            .file-man-bar {
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
                #explorerStatus {
                    letter-spacing: 1.5px;
                    font-size: 12px;
                    text-transform: uppercase;
                    display: inline;
                    position: relative;
                    right: -5px;
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
                    margin: 9px;
                    height: 35px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    i {
                        font-size: 21px;
                        display: flex;
                        align-content: center;
                        cursor: pointer;

                        div {
                            font-family: brownprolight;
                            font-size: 16px;
                            padding-left: 10px;
                            line-height: 20px;
                        }
                    }

                    &:hover {
                        background-color: #3498db;
                    }
                    
                    .ftpCheck  {
                        top: 0;
                        left: 0;
                        height: 18px;
                        width: 18px;
                        background-color: #eee;
                        margin: 0 20px 0 10px;
                    }
                }
            }
        }
    }
}
</style>
