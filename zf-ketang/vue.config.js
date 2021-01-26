module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/common.scss";` //引入全局变量
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
  }
}
