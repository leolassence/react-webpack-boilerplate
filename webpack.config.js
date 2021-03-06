var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var config = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    path.resolve(__dirname, 'app/main.js'),
    path.resolve(__dirname, 'app/assets/scss/main.scss')
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  devServer: {
    outputPath: path.join(__dirname, 'dist')
  },
  
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app'),
        loader: 'babel',
        query: {
          presets: ['react-hmre']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader'})
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=15000'
      }
    ]
  },

  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('styles/style.css'),
    new CopyWebpackPlugin([{ from: 'app/vendors', to: 'vendors' }]),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  ]
};

module.exports = config;