<template>
  <div class="container about">
    <pid />
  </div>
</template>

<script>

import pid from '@/components/pid.vue';

export default {
  name: 'home',
  data() {
    return {
      selected1: 1,
    };
  },
  components: {
    pid,
  },
};
</script>
