import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import moment from 'moment'

Vue.prototype.moment = moment
Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify: new Vuetify(),
}).$mount('#app')
