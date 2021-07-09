import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './assets/sass/style.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router
  
}).$mount('#app')
