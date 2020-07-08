import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import First from './components/FirstComponent.vue'
// import Second from './components/SecondComponse.vue'
import Webview from './components/WebviewComponent.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/first', component: First },
  { path: '/article/:id', component: Webview },
  { path: '*', redirect: '/first' } /**重定向默认找不到路由进入 */
]
var router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
