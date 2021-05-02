import Vue from 'vue';
import './firebase';
import { rtdbPlugin, firestorePlugin } from 'vuefire';
import VuePapaParse from 'vue-papa-parse';
import VueHtmlToPaper from 'vue-html-to-paper';
import VueUploadComponent from 'vue-upload-component';
import store from '@/store';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes',
  ],
  styles: [
    'https://www.w3schools.com/w3css/4/w3.css',
  ],
};

Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

Vue.use(rtdbPlugin);
Vue.use(firestorePlugin);
Vue.component('file-uploade', VueUploadComponent);
Vue.use(VuePapaParse);
Vue.use(VueHtmlToPaper, options);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
