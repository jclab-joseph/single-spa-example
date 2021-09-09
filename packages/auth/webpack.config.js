// webpack.config.js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.ts'
  },
  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  },
  externals: ['vue', 'vue-router', /^@single-spa-example\/.+/],
  optimization: {
    minimize: false,
    splitChunks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', {}]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['*', '.js', '.vue', '.json', '.wasm', '.ts', '.tsx', '.mjs', '.cjs']
  },
  plugins: [
    new VueLoaderPlugin(),
    // new MiniCSSExtractPlugin({
    //   filename: 'index.css'
    // })
  ]
}
