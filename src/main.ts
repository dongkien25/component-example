import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex' 


import module from './module/state'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: module.state,
  mutations: module.mutations
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
