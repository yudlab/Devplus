import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/codeedit',
    name: 'codeedit',
    component() {
      return import('../views/codeedit.vue');
    },
  },
  {
    path: '/pman',
    name: 'pman',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import('../views/projectmanager.vue');
    },
  },
  {
    path: '/codemerge',
    name: 'codemerge',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import('../views/codemerge.vue');
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
