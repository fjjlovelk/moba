import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import './assets/style.css'

Vue.prototype.$http = http
Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods:{
    getAuthorization(){
      return {
        Authorization: `Barer ${sessionStorage.getItem('token') || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
