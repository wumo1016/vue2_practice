// webpack 内置 查找文件
const files = require.context('.', true, /\.js$/) // true 搜索子目录

const modules = {}
files.keys().forEach(key => {
  ;/\.\/(.+)\.js$/.test(key)
  const path = RegExp['$+']
  // 自己不做任何处理
  if (path === 'index') return
  // 获取模块的命名空间
  const namespaced = path.replace(/\/index/, '')
  modules[namespaced] = files(key).default
  modules[namespaced].namespaced = true
})

export default modules
