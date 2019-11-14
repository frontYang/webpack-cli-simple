// 基本配置项
const path = require('path')

module.exports = {
  // 公用配置
  common: {
    publicPath: '/',
    outputUrl: path.resolve(__dirname, './dist')
  },
  // 开发环境配置
  dev: {
    env: '"DEV"',
    contentBase: path.resolve(__dirname, './dist'),
    proxy: {
      /* '/api': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/api': ''
        }
      } */
    }
  },

  // 生产环境配置
  prod: {

  }
}
