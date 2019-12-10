<template>
  <div class="pid">
    <select v-model="a">
      <option v-for="selected in selected1" v-bind:key="selected.id" v-bind:value="{ id: selected.id, name: selected.name }">{{selected.name}}</option>
    </select>
    <p>{{a.id}}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'pid',
  data() {
    return {
      selected1: 1,
      a: {
        id: -1,
        name: "ss"
      }
    };
  },
  created: function() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        this.selected1 = res.data;
      })
  }
};
</script>
