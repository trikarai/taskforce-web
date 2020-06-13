import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

//global component
import Notification from "@/components/Notification";
Vue.component('notification', Notification);

Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { error_details: [""] },
    };
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
