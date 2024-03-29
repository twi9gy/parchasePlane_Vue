import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import message from "./utils/message";
import dateFilter from './filters/date.filters';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false;

Vue.component('Paginate', Paginate)
Vue.use(BootstrapVue);
Vue.use(vuelidate);
Vue.use(message);

Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
