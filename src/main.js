import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'default-passive-events'
// 此项依赖Vue和Element，一定要在两者之后
import utils from "./common/utils"

Vue.prototype.$utils = utils
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')