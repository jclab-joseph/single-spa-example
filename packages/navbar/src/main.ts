import './set-public-path';
import Vue, { ComponentOptions } from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

Vue.config.productionTip = false;

Vue.use(VueSidebarMenu);

const appOptions: ComponentOptions<any> = {
  router,
  store,
  render: (h) => h(App)
};

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: appOptions as any
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

// VUE_APP_STANDALONE_MODE 는 vue-cli serve를 위해,
// window.System 검사는 single-spa로 import했을 때를 감지하기 위함이다.
if (process.env.VUE_APP_STANDALONE_MODE && (!(window as any).System)) {
  new Vue(appOptions)
    .$mount('#app');
}
