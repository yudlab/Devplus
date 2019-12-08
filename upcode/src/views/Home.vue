<template>
  <div class="home">
    <div>
      <select v-model="selected">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>

  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      selected: 1,
    };
  },
};
</script>
