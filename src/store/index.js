import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') || '',
    token: localStorage.getItem('token') || null
  },
  mutations: {
    LOGIN: (state,data) => {
      state.user = data.user;
      state.token = data.token;
    }
  },
  actions: {
  },
  modules: {
  }
})
