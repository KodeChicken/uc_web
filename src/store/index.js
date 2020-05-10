import Vue from 'vue'
import Vuex from 'vuex'

import tab from "./tab";
import permission from "./permission";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tab,
    permission
  }
})
