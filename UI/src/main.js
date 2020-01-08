import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios,)
Vue.config.productionTip = false;

window.$ = window.jQuery = require('jquery');

window.vue = new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
