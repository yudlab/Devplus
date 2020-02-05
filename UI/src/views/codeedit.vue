<template>
  <div class="code">
    <!--div v-if="cpd"
         id="file-operations">
      xxx
    </div-->
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
      cpd: ''
    };
  },
  components: {
    codemirror,
    explorer
  },
  methods: {
    loadContent(msg) {
      this.code = msg
    },
    loadExports() {
      if(window.cpd!==''){
        this.cpd = window.cpd
        this.fetchExports(window.cpd)
      }
    },
    fetchExports(e) {
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
    },
  },
  mounted() {
    this.loadExports()
  }
};
</script>
<style lang="scss"> 
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
    }
}
</style>
