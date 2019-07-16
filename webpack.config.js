let path = require('path')
module.exports = {
  entry: './app.js',
  output: {
    filename: 'app.pkg.js',
    path: path.resolve(__dirname, './')
  }
}
