const utils = require('./utils')
const Koa = require('koa')
const koa_static = require('koa-static')
const app = new Koa()

const staticPath = utils.resolve('dist')

app.use(koa_static(staticPath))

app.listen(3000, () => {
  console.log(`Server is started at http://localhost:3000`)
})
