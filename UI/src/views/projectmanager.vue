<template>
  <div class="pman">
    <pid @pidChanged="pidChangedHandler"/>
    <createnews :baseURL="baseURL" v-if="currentPid" @newsDataChange="newsDataHandler"/>
    <div class="path" v-if="currentPid && newsData">Will be saved in: {{currentPid.newsletterRoot}}S{{newsData.week}}\{{newsData.cmpid}}\</div>
    <div>{{newsData}}</div>
    <br><br>
    <div>{{currentPid}}</div>
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
      cmpid: '',
      newsData: '',
      baseURL: update(this.currentPid.baseURI),
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
    newsDataHandler (value) {
      this.newsData = value;
    },
    update (aa) {
      console.log(aa);
      return "test";
    }
  },
};
</script>

<style lang="scss">
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

    .pman {
      .path {
        position: absolute;
        top: 18px;
        left: 20%;
        color: #FFFFFF;
      }
    }

</style>