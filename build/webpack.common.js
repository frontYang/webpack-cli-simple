// webpack公用打包配置
const config = require('../config').common
const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const publicPath = config.publicPath || '/'
const outputUrl = config.outputUrl || resolve('./dist')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: [
      'lodash'
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: outputUrl,
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Production',
      inject: 'body',
      hash: false,
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
