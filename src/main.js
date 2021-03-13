import Vue from 'vue'
import Axios from 'axios'
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import message from "./utils/message";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "../public/uploadInput.css"

import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false;

Vue.use(Axios);
Vue.component('Paginate', Paginate)
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(message);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
