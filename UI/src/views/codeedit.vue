<template>
  <codemirror  id="code-container" v-model="code" :options="cmOptions"></codemirror>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/theme/lucario.css';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
export default {
  
  name: "codeedit",
  data () {
    return {
      code: 'const a = 10;',
      cmOptions: {
        tabSize: 4,
        theme: 'lucario',
        lineNumbers: true,
        line: true,
      }
    }
  },
  components: {
    codemirror
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
}
</script>
<style lang="scss">
  html, body {
    height: 100% !important;
  }
  #app {
    height: 100%;

    #code-container {
      height: 100%;

      .CodeMirror {
        height: 100% !important;
      }
    }
  }
  
</style>