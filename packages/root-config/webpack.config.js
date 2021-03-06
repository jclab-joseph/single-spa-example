const path = require('path');
const fs = require('fs');
const util = require('util');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'single-spa-example';
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: 'root-config',
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  delete defaultConfig.output.uniqueName;

  const importMapMapping = (process.env.NODE_ENV === 'development') ?
    { from: 'importmap/dev.json', to: 'importmap.json' } :
    { from: 'importmap/prud.json', to: 'importmap.json' };

  return merge(defaultConfig, {
    devServer: {
      static: [
        {
          directory: path.join(__dirname, importMapMapping.from),
          publicPath: `/${importMapMapping.to}`
        },
        {
          directory: path.join(__dirname, '../navbar/dist/'),
          publicPath: '/navbar'
        }
      ]
    },
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          importMapMapping
        ]
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.ejs',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        }
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.wasm', '.ts', '.tsx', '.mjs', '.cjs']
    }
  });
};
