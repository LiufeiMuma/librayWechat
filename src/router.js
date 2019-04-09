import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store';
import * as types from './vuex/types';
import routes from './config/routes';

Vue.use(VueRouter);


const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (store.getters.typeList.length === 0) {
    store.dispatch('setTypeList');
  }
  next();

});


export default router;
