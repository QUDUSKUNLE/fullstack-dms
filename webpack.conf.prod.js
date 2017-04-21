const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: './dist/client',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/,
        loaders: ['css-loader']
      }
    ]
  },
  resolve: {
    extentions: ['', '.js']
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
