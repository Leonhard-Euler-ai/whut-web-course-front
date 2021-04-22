import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    usernameOfArticles: '',
    articles: [],
  },
  mutations: {
    changeUserInfo(state, payload) {
      state.userInfo = payload;
    },
    changeUsernameOfArticles(state, payload) {
      state.usernameOfArticles = payload
    },
    changeArticles(state, payload) {
      state.articles = payload
    }
  },
  actions: {
    setUserInfo(context, payload) {
      context.commit('changeUserInfo', payload)
    },
    setUsernameOfArticles(context, payload) {
      context.commit('changeUsernameOfArticles', payload)
    },
    setArticles(context, payload) {
      context.commit('changeArticles', payload)
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getUsernameOfArticles(state) {
      return state.usernameOfArticles;
    },
    getArticles(state) {
      return state.articles;
    }
  },
  modules: {}
})
