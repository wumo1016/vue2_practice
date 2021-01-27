import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

Vue.config.productionTip = false

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import directives from '@p/directives'
Object.entries(directives).forEach(([id, define]) => {
  Vue.directive(id, define)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
