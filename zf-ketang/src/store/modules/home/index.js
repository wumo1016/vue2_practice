import * as Types from '@s/action-types'
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
    // async [Types.SET_SLIDES]({ commit }) {
    //   let slides = await fecthSlides()
    //   commit(Types.SET_SLIDES, slides) // 交给mutation去更改状态
    // }
  }
}
