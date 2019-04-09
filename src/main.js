// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import wx from 'weixin-js-sdk'
import VueWechatTitle from 'vue-wechat-title'
import Rem from './common/js/rem'
Vue.use(VueWechatTitle)
Vue.use(Rem)

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
