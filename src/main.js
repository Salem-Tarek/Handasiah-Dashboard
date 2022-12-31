import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://backend.handasiah-group.com/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.user}`;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
