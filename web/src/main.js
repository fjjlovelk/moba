import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

// 公共的卡片组件
import MyCard from './components/Card.vue'
Vue.component( "my-card", MyCard )

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
