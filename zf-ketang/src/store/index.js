import Vue from 'vue'
import Vuex from 'vuex'
import * as Types from '@s/action-types'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokens: []
  },
  mutations: {
    [Types.SET_TOKEN](state, token) {
      state.tokens = [...state.tokens, token] // 存储token，页面切换可以让token依次执行
    },
    [Types.CLEAR_TOKEN](state) {
      state.tokens.forEach(token => token()) // 执行所有的取消方法，都调用一下
      state.tokens = [] // 清空列表
    }
  },
  actions: {},
  modules: {
    ...modules
  }
})
