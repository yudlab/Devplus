<template>
  <div id="products">
    <div class="productsItemContainer" v-for="product in products">
      <div class="productsItem">
        <!-- The rest of the elements -->

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Products',

    data() {
      return {
        products: []
      }
    },

    mounted() {
      axios
        .get("js/prods.json")
        .then(response => {
          this.products = response.data.products;
        });
    }
  }
</script>