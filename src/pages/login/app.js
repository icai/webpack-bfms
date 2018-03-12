import Vue from 'vue'
import ElementUI from 'element-ui'
import "normalize.css/normalize.css"
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
