const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// single-spa 와 standalone 모두 동작할 수 있도록 아래와 같이 설정을 해 준다.

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  chainWebpack: (config) => {
    config.devServer.headers({
      'Access-Control-Allow-Origin': '*',
    });
    config.devServer.set('disableHostCheck', false);
    config.output.filename('app.js');
    config.output.publicPath('/');

    // config.externals([
    //   'single-spa',
    //   'vue',
    //   'vue-router'
    // ]);
  },
  lintOnSave: true,
  configureWebpack: {
    output: {
      libraryTarget: 'umd'
    },
    optimization: {
      splitChunks: false
    }
  }
};
