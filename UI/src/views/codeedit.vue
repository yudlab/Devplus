<template>
  <div class="code">
    <explorer id="explorer"></explorer>
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
      cwd: window.cwd
    };
  },
  components: {
    codemirror,
    explorer
  },
  methods: {
    loadCode() {

    },
  },
};
</script>
<style lang="scss"> 
#app {
  .code {
      height: 100%;
      #explorer {
        height: 100%;
        width: 60%;
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        z-index: 99;
      }
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
