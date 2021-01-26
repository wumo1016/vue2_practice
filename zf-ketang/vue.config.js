function resolve(dir) {
  return require('path').join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common.scss";` //引入全局变量
      },
      // 配置 px2rem  postcss-plugin-px2rem lib-flexible
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 37.5 // 表示设计稿的大小 375px => 37.5rem   75  750 => 75rem
          })
        ]
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/api'))
      .set('@c', resolve('src/components'))
      .set('@p', resolve('src/public'))
      .set('@s', resolve('src/store'))
      .set('@sty', resolve('src/styles'))
      .set('@v', resolve('src/views'))
  },
  lintOnSave: false
}
