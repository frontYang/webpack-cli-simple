const path = require('path')

module.exports = {
  // 拼接文件夹路径
  resolve(dir) {
    return path.resolve(__dirname, '..', dir)
  }
}
