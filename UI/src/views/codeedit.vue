<template>
  <div class="code">
    <div id="file-operations">
      <div class="fas fa-eraser" @click="clear"></div>
      <div id="fa-save" class="fas fa-save" @click="fsSave"></div>
      <div class="animated fadeInDownv fas fa-paste"></div>
      <div class="animated fadeInDownv fas fa-code"></div>
      <div class="animated fadeInDownv fas fa-language"></div>
      <div class="animated fadeInDownv fas fa-envelope"></div>
      <div class="animated fadeInDownv fas fa-"></div>
      <div class="animated fadeInDownv fas fa-"></div>
      <div class="animated fadeInDownv fas fa-"></div>
      <div class="animated fadeInDownv fas fa-"></div>
      <div class="animated fadeInDownv fas fa-"></div>
      <div class="animated fadeInDownv fas fa-"></div>
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

export default {
  name: 'codeedit',
  data() {
    return {
      code: window.export,
      cmOptions: {
        tabSize: 4,
        theme: 'lucario',
        lineNumbers: true,
        line: true,
        smartIndent: true,
        lineWrapping: true,
        scrollbarStyle: null
      },
      cpd: '',
      editorFilePath: '',
      filename: '\\visu.html',
    };
  },
  components: {
    codemirror,
    explorer
  },
  methods: {
    clear(){
      this.code=''
      console.clear()
      console.log("Keep shining!")
    },
    loadContent(msg) {
      this.code = msg
    },
    loadExports() {
      if(window.cpd!==''&&undefined!=window.cpd){
        this.cpd = window.cpd
        this.fetchExports(window.cpd)
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
                    path: e+'\\visu.html',
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
    fsSave() {
      var e = this.code
      console.log(e)
      var f = window.cpd+this.filename
      if(""!=e || "undefined"!==e){
        if(""==f || "undefined"==f){
          console.log("Path error.")
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
                  allowAppend: true,
              },
            }),
            success(msg) {
              switch(msg){
                case '200':
                  console.log("file was saved.")
                  setTimeout(function(){
                    $('#fa-save').addClass('success')
                  }, 3000)
                  $('#fa-save').removeClass('success')
                  return;
                case '500':
                case '400':
                case '100':
                default:  
                  console.log("Error, file not saved. ->", msg) 
                  setTimeout(function(){
                    $('#fa-save').addClass('failed')
                  }, 3000)
                  $('#fa-save').removeClass('failed')
              }
            },
        })
      } else {
        console.log("Error: Empty file." )
      }
    }
  },
  mounted() {
    this.loadExports()
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
          height: 1.5rem;
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
