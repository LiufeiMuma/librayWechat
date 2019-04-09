import Vue from 'vue';
import Vuex from 'vuex';
// import common from './modules/common'
import booktype from './modules/booktype'
import user from './modules/user'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    booktype,
    // user,
  }
})




