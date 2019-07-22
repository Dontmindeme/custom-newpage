let path = require('path')
module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    filename: 'app.pkg.js',
    path: path.resolve(__dirname, './')
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  }
}
