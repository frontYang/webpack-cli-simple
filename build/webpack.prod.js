// webpack生产环境打包配置
const merge = require('webpack-merge')
const common = require('./webpack.common')
const utils = require('./utils')
const config = require('./config').prod
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  // 输出
  output: {
    path: utils.resolve('./dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },

  // 优化
  optimization: {
    splitChunks: {
      chunks: 'all', // initial、async和all
      minSize: 30000, // 形成一个新代码块最小的体积
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: '~', // 打包分割符
      name: true,
      cacheGroups: {
        /* vendors: { // 项目基本框架等
          chunks: 'all',
          test: /(babel-polyfill)/,
          priority: 100, // 优先级
          name: 'vendors'
        }, */
        'async-commons': { // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 2,
          priority: 90, // 优先级
          name: 'async-commons'
        },
        commons: { // 其他同步加载公共包
          chunks: 'all',
          minChunks: 2,
          priority: 80, // 优先级
          name: 'commons'
        }
      }
    }

    // // 分块
    // splitChunks: {
    //   // 可以继承和覆盖splitChunks.*;中的任何选项
    //   cacheGroups: {
    //     default: false, // 禁用默认缓存组
    //     vendors: false,
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all'
    //     },
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  },

  // 模块配置
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    // 清除打包目录
    new CleanWebpackPlugin(),

    // 提取css文件
    // DOC: https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),

    // 优化css 删除可能重复的CSS
    // DOC: https://github.com/NMFR/optimize-css-assets-webpack-plugin
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // 压缩js
    // DOC: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    new UglifyJSPlugin({
      sourceMap: true
    }),

    // 生成hmtl
    // DOC: https://github.com/jantimon/html-webpack-plugin
    new HtmlwebpackPlugin({
      title: 'Production',
      hash: true,
      template: utils.resolve('public/index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 删除空格
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),

    // 可视化性能面板
    new BundleAnalyzerPlugin()
  ]
}, config)
