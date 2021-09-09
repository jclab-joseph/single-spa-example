import { setPublicPath } from 'systemjs-webpack-interop';

try {
  setPublicPath('@single-spa-example/navbar');
} catch (e) {
  if (!process.env.VUE_APP_STANDALONE_MODE) {
    throw e;
  }
}
