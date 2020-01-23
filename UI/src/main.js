import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false;

/*Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
  options: { path: '/' }, // Optional options
}));*/

window.vue = new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
