// 基本配置项
// const utils = require('./utils')

module.exports = {
  // 公用
  common: {
    /* output: {
      path: utils.resolve('dist'),
      publicPath: '/'
    } */
  },

  // 开发环境
  dev: {
    devServer: {
      port: 8081,

      /* proxy: {
        '/mock': 'http://192.168.3.24:7300'
      } */

      /* // 代理
      proxy: {
        // http://localhost:8081/api/ => http://192.168.3.24:7300/mock/5d78af02fbadfc5fb86af526/example/
        '/api': {
          target: 'http://192.168.3.24:7300/mock/5d78af02fbadfc5fb86af526/example'
        }
      } */

      proxy: {
        // http://localhost:8081/api/ => http://192.168.3.24:7300/mock/5d78af02fbadfc5fb86af526/example/
        '/api': {
          target: 'http://192.168.3.24:7300',
          pathRewrite: {
            '^/api': '/mock/5d78af02fbadfc5fb86af526/example'
          }
        }
      }
    }
  },

  // 生产环境
  prod: {
    /* output: {
      path: utils.resolve('dist')
    } */
  }
}
