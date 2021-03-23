import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  mutations: {
    changeUserInfo(state,payload){
      state.userInfo=payload;
    }
  },
  actions: {
    setUserInfo(context,payload){
      context.commit('changeUserInfo',payload)
    }
  },
  getters:{
    getUserInfo(state){
        return state.userInfo;
    }
  },
  modules: {
  }
})
