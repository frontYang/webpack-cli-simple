// webpack开发环境打包配置
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const config = require('../config').dev
const contentBase = config.contentBase || '../dist'
const proxy = config.proxy || {}

module.exports = merge(common, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: contentBase,
    host: 'localhost',
    compress: true,
    hot: true,
    hotOnly: true,
    proxy: proxy
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
