<template>
  <div class="pman">
    <pid @pidChanged="pidChangedHandler"/>
    <createnews @dateChanged="dateChangedHandler"/>
    <div v-if="week">
      week number: {{week}}
    </div>
  </div>
</template>

<script>

import pid from '@/components/pid.vue';
import createnews from '@/components/createnews.vue';

export default {
  name: 'home',
  data() {
    return {
      selected: 2,
      currentPid: null,
      week: '',
    };
  },
  components: {
    pid,
    createnews,
  },
  methods: {
    pidChangedHandler (value) {
      this.currentPid = value;
    },
    dateChangedHandler (value) {
      this.week = value;
    }
  },
};
</script>

<style>
    .pid-select {
      position: absolute;
      top: 15px;
      right: 25px;
      width: 155px;
      height: 30px;
      padding-left: 10px;

      option {
        padding: 5px;
      }
    }
    .pid-sub-selector {
      position: absolute;
      left: 0;
      margin: 20px;
      height: 35px;
      width: 155px;
      border-radius: 5px;
      border: 2px solid #3498db;
    }

</style>