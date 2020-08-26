<template>
  <div class="pman">
    <createnews />
  </div>
</template>

<script>

import createnews from '@/components/createnews.vue';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    createnews,
  },
  methods: {
  },
};
</script>

<style lang="scss">
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
        color: #FFFFFF !important;
        font-family: 'brownprolight';
        cursor: pointer;
      }
    }

</style>
