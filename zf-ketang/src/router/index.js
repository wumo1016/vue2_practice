import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import LoadingComponent from '@c/loading'
import hooks from './hooks'

Vue.use(VueRouter)

const loadAsyncComponent = load => {
  const component = () => ({
    component: load(),
    loading: LoadingComponent
  })
  return {
    render(h) {
      return h(component)
    }
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lesson',
    name: 'Lesson',
    component: loadAsyncComponent(() => import('@/views/lesson'))
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadAsyncComponent(() => import('@/views/profile'))
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Object.values(hooks).forEach(hook => {
  router.beforeEach(hook)
})

export default router
