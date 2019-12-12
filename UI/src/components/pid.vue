<template>
  <div class="pid">
    <select v-model="a"
            v-on:change="fetch(a, $event)">
      <option v-for="pid in pids"
              v-bind:key="pid.id"
              v-bind:value="pid">{{pid.name}}
      </option>
    </select>
    <table v-for="aa in a">
      <tr>
        <td>{{aa}}</td>
      </tr>
    </table>
    </ul>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'pids',
  data() {
    return {
      pids: "need fetch...",
      a: "need fetch..."
    };
  },
  created: function() {
    axios
      .get('http://127.0.0.1:3000/pids')
      .then(res => {
        this.pids = res.data;
      })
  },
  methods: {
    fetch: function (a) {
      alert(a.name)
    }
  },
};
</script>
<style scoped>
  table {
    border: 1px solid #000000;
  }
</style>