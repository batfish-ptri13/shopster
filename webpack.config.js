const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: '/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {

    compress: true,
    proxy: {
      '/api/*': 'http://localhost:3000',
      '/auth':'http://localhost:3000'
    },
    historyApiFallback: true,
    hot: true
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Shopster - Scratch Project - Red Lipped Batfish',
    filename: 'index.html',
    template: './client/index.html',
    inject: 'body'
  })]
}