const webpack = require('webpack');
const resolve = require('path').resolve;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const inDevelopment = process.env.NODE_ENV === 'development';

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// context variable
let context = resolve(__dirname, '../');

const config = {
  context: context,
  // devtool: is added conditionally at the bottom of the file
  entry: {
    'background-final': resolve(__dirname, './src/background.js'),
    'mypage-final': resolve(__dirname, './src/mypage.js'),

  },
  output: {
    filename: '[name].js',
    chunkFilename: 'bundled/[name].js',
    path: resolve(__dirname, './dist'),
    publicPath: '/static/dist/'
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /en-ca/
    ),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      // Manages `.vue` files (i.e. Single File Components)
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: 'app',
      chunks: "all",
    },
  }
};

if (inDevelopment) {
  console.log("IN DEVELOPMENT");
  console.log("`config.devtool = \"eval-source-map\"`");
  config['devtool'] = 'eval-source-map';
} else {
  console.log("IN PRODUCTION");
}
module.exports = config;
