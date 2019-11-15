const path = require('path')
const glob = require('glob')

module.exports = {
  // 获取文件夹路径
  resolve(dir) {
    return path.resolve(__dirname, '..', dir)
  },

  /**
   * 根据目录获取入口
   * @param  {[type]} globPath [description]
   * @return {[type]}          [description]
   */
  getEntry(globPath) {
    const entries = {}
    glob.sync(globPath).forEach(function(entry) {
      const basename = path.basename(entry, path.extname(entry))
      const pathname = path.dirname(entry)
      if (!entry.match(/js\/lib\//)) {
        entries[basename] = pathname + '/' + basename
      }
    })
    return entries
  },

  /**
   * 生成html
   */
  getPlugins() {

  }
}
