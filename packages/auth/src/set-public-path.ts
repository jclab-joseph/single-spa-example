import { setPublicPath } from 'systemjs-webpack-interop';

try {
  setPublicPath('@single-spa-example/auth-front');
} catch (e) {
  if (!process.env.VUE_APP_STANDALONE_MODE) {
    throw e;
  }
}
