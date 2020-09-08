<template>
  <div class="code" @click="hideContextMenu">
    <div id="file-operations">
      <div class="fas fa-eraser" @click="clear"></div>
      <div id="fa-save" class="fas fa-save" @click="fsSave"></div>
      <div class="fas fa-paste" @click="copyToClipboard($event)"></div>
      <div class="fas fa-code" @click="optimizeNews"></div>
      <div class="fas fa-language" @click="entitize"></div>
      <div class="fas fa-sort-amount-down-alt" @click="indentCode(code, $event)"></div>
      <div id="sendmail" class="fas fa-envelope" @contextmenu.prevent="showMailTarget()" @click="sendMail(defaultEmail)"></div>
      <div class="fas fa-envelope-open-text"></div>
      <div class="fas fa-file-upload"></div>
      <div class="fas fa-folder" @click="toggleExplorerr"></div>
    </div>
    <explorer @loadContent="loadContent"
              id="explorer"
              :toggleExplorer="toggleExplorer"></explorer>
    <codemirror
      id="code-container"
      v-model="code"
      :options="cmOptions"
      ref="codeinstance">
    </codemirror>
    <div id="emailList">
      <ul>
        <li v-for="a in emailList" v-bind:key="a.id" @click="sendMail(a.emails)">{{a.name}}</li>
      </ul>
    </div>
    <table id="htmlErr">
      <tr v-for="a in htmlErr" v-bind:key="a[0]">
        <td>{{a[0]}}</td>
        <td>{{a[2]}}</td>
        <td>{{a[1]}}</td>
        <td>{{a[3]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/theme/lucario.css';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/lucario.css';
import explorer from '@/components/explorer.vue';
import * as yud from '../assets/js/yud';
import * as emailSettings from '../assets/js/mail/settings/mail';
import prettier from 'prettier/standalone';
import htmlPrettier from "prettier/parser-html";
export default {
  name: 'codeedit',
  data() {
    return {
      code: sessionStorage.getItem('editorContents'),
      cmOptions: {
        tabSize: 4,
        theme: 'lucario',
        lineNumbers: true,
        line: true,
        smartIndent: true,
        lineWrapping: true,
        scrollbarStyle: null
      },
      editorFile: '',
      filename: '\\visu.html',
      toggleExplorer: true,
      defaultEmail: emailSettings.emailList.me.emails,
      emailList: emailSettings.emailList,
      newsData: JSON.parse(sessionStorage.getItem('newsData')),
      htmlErr: ''

    };
  },
  components: {
    codemirror,
    explorer
  },
  methods: {
    hideContextMenu: () => {
      $('#emailList').css('display', 'none')
    },
    showMailTarget: ($event) => {
      $('#emailList').css('display', 'block')
      $('#emailList').css('top', event.clientY)
      $('#emailList').css('left', event.clientX)
    },
    sendMail(to){
      var parser = new DOMParser()
      var doc = parser.parseFromString(this.code, "text/html")
      if(doc.querySelector('title')){
        var title = doc.querySelector('title')
      } else {
        var title = "No subject"
      }
      var _this = this
      if(this.code!=''&&''!=to){
        $.ajax({
            type: 'POST',
            // make sure you respect the same origin policy with this url:
            // http://en.wikipedia.org/wiki/Same_origin_policy
            url: 'http://127.0.0.1:3000/gmail-send',
            contentType: 'application/json',
            data: JSON.stringify({
              data: {
                  from: 'Yud',
                  to: to,
                  subject: title,
                  html: _this.code,
                  text: ''
              },
            }),
            success(msg) {
              console.log("Request sent to endpoint. RES-> ", msg)
              if(typeof msg == "object" && msg.rejected.length == 0 && msg.response !== ""){
                $('#sendmail').addClass('success')
                  setTimeout(function(){
                    $('#sendmail').removeClass('success')
                  }, 5000)
              } else {
                console.error("Email not sent: -> ", msg)
                $('#sendmail').addClass('failed')
                setTimeout(function(){
                  $('#sendmail').removeClass('failed')
                }, 5000)
              }
            },
          })
      } else {
        console.error('Nothing to send or empty recipient.')
        $('#sendmail').addClass('failed')
        setTimeout(function(){
          $('#sendmail').removeClass('failed')
        }, 5000)
      }
    },
    indentCode(e, $event){
         try {
           var prettyCode = prettier.format(e, {
            parser: "html",
            printWidth: 5000,
            plugins: [htmlPrettier],
          })
         } catch(e) {
           console.log('Error: '+e)
           $($event.target).addClass('failed')
           setTimeout(function(){
            $($event.target).removeClass('failed')
           }, 5000)
         } finally {
           this.code = prettyCode;
            $($event.target).addClass('animated heartBeat')
            setTimeout(function(){
              $($event.target).removeClass('animated heartBeat')
            }, 2000)
         }
    },
    toggleExplorerr(){
      this.toggleExplorer = (this.toggleExplorer)?false:true;
    },
    optimizeNews(){
      this.code = yud.cleanNews(this.code)
      yud.tagsCheck(this.code)
    },
    copyToClipboard: function ($event){
      yud.copyToClipboard(this.code)
      $($event.target).addClass('animated heartBeat')
      setTimeout(function(){
        $($event.target).removeClass('animated heartBeat')
      }, 2000)
    },
    entitize(){
      this.code = yud.entitizer('encode', this.code)
    },
    clear(){
      this.code=''
      console.clear()
      console.log("Keep shining!")
    },
    loadContent(msg) {
      this.code = msg
    },
    loadExports() {
      var e = sessionStorage.getItem('editorFile')
      if(e!==''&&undefined!=e){
        this.fetchExports(e)
      }
    },
    fetchExports(e) {
        if(''!==e&&undefined!=e) {
          var _this = this
          console.log(e)
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
                console.log("Success @ fetchExport->Editor")
                _this.code = msg
              },
          })
        } else {
          console.log('Error: empty path to fetch.')
        }
    },
    updateEditor(){
      sessionStorage.setItem('editorContents', this.code)
    },
    fsSave() {
      var e = this.code
      console.log(e)
      var f = sessionStorage.getItem('editorFile')
      if(""!=e || "undefined"!==e){
        if(""==f || "undefined"==f){
          alert("Path error.")
          return;
        }
        console.log("File will be saved in: ",f)
        $.ajax({
            type: 'POST',
            // make sure you respect the same origin policy with this url:
            // http://en.wikipedia.org/wiki/Same_origin_policy
            url: 'http://127.0.0.1:3000/fs-save',
            contentType: 'application/json',
            data: JSON.stringify({
              data: {
                  contents: e,
                  path: f,
                  fsforceWrite: true,
              },
            }),
            success(msg) {
              switch(msg){
                case 'OK':
                  console.log("file was saved.")
                  $('#fa-save').addClass('success')
                  setTimeout(function(){
                    $('#fa-save').removeClass('success')
                  }, 3000)
                  return;
                case '500':
                case '400':
                case '100':
                default:  
                  alert("Error, file not saved. ->", msg) 
                  $('#fa-save').addClass('failed')
                  setTimeout(function(){
                  $('#fa-save').removeClass('failed')
                  }, 3000)
              }
            },
        })
      } else {
        alert("Error: Empty file." )
      }
    }
  },
  mounted() {
    this.loadExports(),
    $.codemi = this.$refs.codeinstance.codemirror
    //document.documentElement.requestFullscreen()
  },
  watch:{
    code(){
      this.updateEditor()
      this.htmlErr = yud.tagsCheck(this.code)
    },
  }
};
</script>
<style lang="scss">
#htmlErr {
  position: fixed;
  top: 25px;
  right: 15px;
  color: #e74c3c;
  font-size: 12px;
}
#emailList {
  display: none;
  position: fixed;
  top: 0;
  left: 40%;
  border: 1px solid #2ecc71;
  background-color: #FFFFFF;
  z-index: 999999;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    padding: 0 15px;
    li {
      list-style: none;
      width: 100%;
      margin-bottom: 5px;
      padding: 2px;
      &:hover {
        background-color: #2ecc71;
        color: white;
      }
    }
  }
}
.success {
  border-bottom: 2px solid #2ecc71;
  color: #2ecc71;
}
.failed {
  border-bottom: 2px solid #e74c3c;
  color: #e74c3c;
}
#app {
  .code {
    height: 90%;
      #code-container {
        position: relative;
        height: 100%;

        .CodeMirror {
          height: 100% !important;
        }
      }
      #file-operations {
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        left: 400px;
        height: 10%;
        color: #FFFFFF;

        .fas {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          height: 3.8rem;
          width: 2.9rem;

          &:hover {
            color: #2ecc71;
            cursor: pointer;
          }
        }
      }
    }
}
</style>
