import * as Types from '@s/action-types'
import { fecthSlides } from '@a/home'
export default {
  state: {
    category: -1,
    slides: []
  },
  mutations: {
    [Types.SET_CATEGORY](state, payload) {
      state.category = payload
    },
    [Types.SET_SLIDES](state, slides) {
      state.slides = slides
    }
  },
  actions: {
    async [Types.SET_SLIDES]({ commit }) {
      const slides = await fecthSlides()
      commit(Types.SET_SLIDES, slides)
    }
  }
}
