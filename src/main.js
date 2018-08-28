import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
import store from './store'

import App from './App.vue'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
