<template>
  <div class="pman">
    <pid @pidChanged="pidChangedHandler"/>
    <createnews
                :nldata="nldata"
                 v-if="currentPid"
                 @newsDataChange="newsDataHandler"/>
    <div class="path" v-if="currentPid && newsData">Will be saved in: {{currentWd}}</div>
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
      baseURL: '',
      nldata: {
        "nldata": "",
        "currentWd": "",
      },
      currentWd: '',
    };
  },
  components: {
    pid,
    createnews,
  },
  methods: {
    pidChangedHandler (value) {
      this.currentPid = this.nldata.currentPid = value;
      this.baseURL = this.currentPid.baseURI;
    },
    newsDataHandler (value) {
      this.newsData = value;
      this.currentWd = this.currentPid.nlWorkingDir + 'S' + this.newsData.week + '\\' + this.newsData.cmpid + '\\'
    },
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
        right: 20%;
        color: #FFFFFF;
      }
    }

</style>