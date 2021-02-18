import Vue from 'vue'
import Axios from 'axios'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "../public/uploadInput.css"

import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false;

Vue.use(Axios);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
