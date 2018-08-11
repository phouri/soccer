import Vue from 'vue'
import Vuex from 'vuex'
import { getSelfUser } from '@/api/usersApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    user: null,
  },
  mutations: {
    set_user(state, user) {
      state.user = user
    },
    set_ready(state, ready) {
      state.ready = ready
    },
  },
  actions: {
    async getAndSetUser({ commit } ) {
      const userResponse = await getSelfUser()
      commit('set_user', userResponse.user)
    },
    async init({ commit, dispatch }) {
      await dispatch('getAndSetUser')
      commit('set_ready', true)
    },
  },
})
