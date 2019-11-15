// webpack开发环境打包配置
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const utils = require('./utils')
const config = require('./config').dev
const HtmlwebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    compress: true,
    hot: true, // 开启热更新
    hotOnly: true // //在没有页面刷新的情况下启用热模块替换（当编译失败时，不会刷新页面）
  },
  plugins: [
    /* new webpack.DefinePlugin({
      'process.env': config.env
    }), */
    // plugins
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Production',
      template: utils.resolve('public/index.html'),
      filename: 'index.html',
      inject: true
    })
  ]
}, config)
