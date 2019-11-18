// webpack生产环境打包配置
const merge = require('webpack-merge')
const webpack = require('webpack')
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
      // 表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks
      chunks: 'all',

      // 抽取出来的文件在压缩前的最小大小,默认30kb
      minSize: 30000,

      // 抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小
      maxSize: 0,

      // 被引用次数，默认为1；
      minChunks: 1,

      // 最大的按需(异步)加载次数，默认为 5；
      maxAsyncRequests: 5,

      // 最大的初始化加载次数，默认为 3；
      maxInitialRequests: 3,

      // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      automaticNameDelimiter: '~',

      // 允许为SplitChunksPlugin生成的块名设置最大字符数， 默认30
      automaticNameMaxLength: 30,

      // 抽取出来文件的名字，默认为 true，表示自动生成文件名；
      name: true,

      // 缓存组
      cacheGroups: {
        vueBase: {
          name: 'vueBase',
          test: (module) => {
            return /vue/.test(module.context)
          },
          chunks: 'initial',
          priority: 10
        },
        common: {
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20
        }
      }
    }
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

    // 会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
    new webpack.HashedModuleIdsPlugin(),

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

    new HtmlwebpackPlugin({
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
