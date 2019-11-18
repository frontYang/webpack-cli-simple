// webpack开发环境打包配置
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const utils = require('./utils')
const config = require('./config').dev
const HtmlwebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // host
    host: 'localhost',

    // 是否一切服务都启用 gzip 压缩
    compress: true,

    // 发生错误是否覆盖在页面上
    overlay: true,

    // 开启热更新
    hot: true,

    // 提供静态文件目录地址
    // 基于express.static实现
    contentBase: utils.resolve('dist')
  },
  plugins: [
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),

    // 启用热替换模块
    new webpack.HotModuleReplacementPlugin(),

    // 生成html
    new HtmlwebpackPlugin({
      template: utils.resolve('public/index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 删除空格
        removeAttributeQuotes: true // 移除属性的引号
      }
    })
  ]
}, config)
