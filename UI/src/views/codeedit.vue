<template>
  <div class="code">
    <div id="file-operations">
      <div class="fas fa-eraser" @click="clear"></div>
      <div id="fa-save" class="fas fa-save" @click="fsSave"></div>
      <div class="fas fa-paste" @click="copyToClipboard($event)"></div>
      <div class="fas fa-code" @click="optimizeNews"></div>
      <div class="fas fa-language" @click="entitize"></div>
      <div class="fas fa-envelope"></div>
      <div class="fas fa-envelope-open-text"></div>
      <div class="fas fa-file-upload"></div>
      <div class="fas fa-"></div>
      <div class="fas fa-"></div>
      <div class="fas fa-"></div>
      <div class="fas fa-"></div>
    </div>
    <explorer @loadContent="loadContent"
              id="explorer"></explorer>
    <codemirror
      id="code-container"
      v-model="code"
      :options="cmOptions">
    </codemirror>
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
import * as yud from '../assets/js/yud.js'
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
    };
  },
  components: {
    codemirror,
    explorer
  },
  methods: {
    optimizeNews(){
      this.code = yud.cleanNews(this.code)
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
    this.loadExports()
  },
  watch:{
    code(){
      this.updateEditor()
    },
  }
};
</script>
<style lang="scss"> 
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
