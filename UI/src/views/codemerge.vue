<template>
  <codemirror :merge="true" :options="cmOption" @scroll="onCmScroll"></codemirror>
</template>

<script>
// require component
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/merge/merge.js';
import 'codemirror/addon/merge/merge.css';
import DiffMatchPatch from 'diff-match-patch';

window.diff_match_patch = DiffMatchPatch;
window.DIFF_DELETE = 1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 1;
export default {
  name: 'codemerge',
  data() {
    return {
      cmOption: {
        value: '<p>hello</p>',
        origLeft: null,
        orig: '<p>hello world</p>',
        connect: 'align',
        mode: 'text/html',
        lineNumbers: true,
        collapseIdentical: true,
        highlightDifferences: true,
      },
    };
  },
  methods: {
    onCmScroll() {
      console.log('onCmScroll');
    },
  },
  components: {
    codemirror,
  },
};
</script>
