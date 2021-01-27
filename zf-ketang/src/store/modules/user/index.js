import * as Types from '@s/action-types'
import per from '@/router/permission'
import { toLogin, validate } from '@/api/user'
import router from '@/router'
const filterRouter = authList => {
  // 我要拿每个路由去看在不在权限中
  authList = authList.map(item => item.auth)
  function filter(per) {
    let result = per.filter(route => {
      if (authList.includes(route.meta.auth)) {
        if (route.children) {
          // 嵌套路由 一般不超过三层
          route.children = filter(route.children)
        }
        return route
      }
    })
    return result
  }
  return filter(per)
}

export default {
  state: {
    username: '',
    hasPermission: false, // 登录之后 - 权限
    token: '', // jwt 的方式
    authList: [], // 登陆后 =》  菜单权限列表
    menuPermission: false,
    btnPermission: ['edit', 'remove'] // 权限列表
  },
  mutations: {
    [Types.SET_USER](state, payload) {
      state.token = payload.token
      state.username = payload.username
      state.authList = payload.authList

      // cookie -> localStorage
      if (payload.token) {
        // 存储token
        localStorage.setItem('token', payload.token)
      }
    },
    [Types.SET_PERMISSION](state, payload) {
      state.hasPermission = payload
    },
    [Types.SET_MENU_PERMISSION](state, payload) {
      state.menuPermission = payload
    }
  },
  actions: {
    async [Types.SET_USER]({ commit }, { userInfo, has }) {
      commit(Types.SET_USER, userInfo)
      commit(Types.SET_PERMISSION, has)
    },
    async [Types.SET_LOGIN]({ dispatch }, payload) {
      let userInfo = await toLogin(payload)
      dispatch(Types.SET_USER, { userInfo, has: true })
    },
    async [Types.VALIDATE]({ dispatch }) {
      // 此时需要 看一下 用户是否登录过
      if (!localStorage.getItem('token')) return false
      try {
        // axios 里面的请求中增加token ， 传递到后端中，让他验证去
        let userInfo = await validate() // 校验是否登录过
        dispatch(Types.SET_USER, { userInfo, has: true })
        return true
      } catch (e) {
        dispatch(Types.SET_USER, { userInfo: {}, has: false })
        return false
      }
    },
    async [Types.ADD_ROUTE]({ commit, state }) {
      // 添加路由
      let authList = state.authList
      let routes = filterRouter(authList)
      let route = router.options.routes.find(item => item.path == '/profile')
      route.children = routes // 告诉你这是你的儿子 ，儿子是动态添加的
      router.addRoutes([route]) // 动态再次添加进入

      console.log(router)
      commit(Types.SET_MENU_PERMISSION, true)
    }
  }
}
