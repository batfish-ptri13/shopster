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
    static: {
      // this './build' is the path to the files in my project folder
      directory: path.join(__dirname, './build'),
      // this '/build' is the route, which evaluates to localhost:8080/build
      // route for webpack internal server which serves files from 'directory' path at route /build
      publicPath: '/build'
    },
    compress: true,
    proxy: {
      '/api/*': 'http://localhost:3000'
    }
  },

  plugins: [new HtmlWebpackPlugin({
    title: 'Shopster - Scratch Project - Red Lipped Batfish',
    filename: 'index.html',
    template: './client/index.html',
    inject: 'body'
  })]
}