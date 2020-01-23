<template>
  <div class="pid">
    <select class="pid-select"
            v-model="a"
            v-on:change="pidChanged">
      <option v-for="pid in pids"
              v-bind:key="pid.id"
              v-bind:value="pid">{{pid.name}}
      </option>
    </select>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'pids',
  data() {
    return {
      pids: 'need fetch...',
      a: 'need fetch...',
      obj: {},
    };
  },
  created() {
    axios
      .get('http://127.0.0.1:3000/pids')
      .then((res) => {
        this.pids = res.data;
      });
  },
  methods: {
    add() {
      axios
        .post('http://127.0.0.1:3000/getpaths', this.obj)
        .then((res) => {
          this.pids = res.data;
        });
    },
    pidChanged() {
      this.$emit('pidChanged', this.a);
    },
  },
};
</script>
<style scoped>
  .pid {
    background-color: #2c3e50;
    color: #FFFFFF;
    width: 100%;
    height: 100%;
  }
  select {
    border: 2px solid #FFFFFF;
    border-radius: 5px;
  }
</style>
