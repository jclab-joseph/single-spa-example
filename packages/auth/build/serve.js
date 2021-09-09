const path = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const configuration = require(path.join(__dirname, '../webpack.config.js'));
const compiler = webpack(configuration);

middleware(compiler, {
  writeToDisk: (filePath) => {
    console.log('filePath : ', filePath);
    return true;
  },
});
