<template>
  <div class="pid">
    <select v-model="a">
      <option v-for="pid in pids"
              v-bind:key="pid.id"
              v-bind:value="pid.id">{{pid.name}}
      </option>
    </select>
    <p>{{a.id}}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'pids',
  data() {
    return {
      pids: "need fetch...",
      a: String
    };
  },
  created: function() {
    axios
      .get('http://127.0.0.1:3000/pids')
      .then(res => {
        this.pids = res.data;
      })
  }
};
</script>
