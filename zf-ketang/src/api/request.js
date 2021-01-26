import axios from 'axios'
import store from '../store'
import * as Types from '@s/action-types'
class Request {
  constructor() {
    this.baseURL =
      process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:7002'
    this.timeout = 3000
    this.queue = {} // 维护请求队列
  }
  setInterceptor(instance, url) {
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      if (Object.keys(this.queue).length == 0) {
        // 第一次请求开启 loading
      }
      // let token = localStorage.getItem('token')
      // if (token) {
      //   config.headers.authorization = token
      // }

      config.cancelToken = new axios.CancelToken(c => {
        // c就是当前取消请求的 回调函数
        store.commit(Types.SET_TOKEN, c)
      })
      return config
    })
    instance.interceptors.response.use(
      res => {
        delete this.queue[url]
        if (Object.keys(this.queue).length == 0) {
          // 最后一次关闭loading
        }
        if (res.data.err == 0) {
          return res.data.data // 接口里面配合 可以switchCase 状态
        } else {
          return Promise.reject(res.data) // 失败抛出异常即可
        }
      },
      err => {
        delete this.queue[url]
        if (Object.keys(this.queue).length == 0) {
          // 最后一次关闭loading
        }
        return Promise.reject(err)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
    this.setInterceptor(instance, config.url)
    return instance(config)
  }
  get(url, params = {}) {
    return this.request({
      url,
      method: 'get',
      params
    })
  }
  post(url, data = {}) {
    return this.request({
      url,
      method: 'post',
      data
    })
  }
}
export default new Request()
