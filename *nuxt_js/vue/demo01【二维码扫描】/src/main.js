import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import First from './components/FirstComponent.vue'
import Webview from './components/WebviewComponent.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import FirstHome from './components/FirstHome.vue'
import FirstIntroduce from './components/FirstIntroduce.vue'
import FirstAboutUs from './components/FirstAboutUs.vue'
import FirstDown from './components/FirstDown.vue'
import FirstContract from './components/FirstContract.vue'

import QrLogin from './components/QrLogin.vue'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// 图片第几会放大预览

/**
 * <viewer :images="signImages">
        <img v-for="src in signImages" :src="src" :key="src" width="50">
    </viewer>
 */
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

import io from "socket.io-client";
const socket = io("http://127.0.0.1:7001");
Vue.prototype.$socket = socket;

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI);

const routes = [
  {
		path: '/first',
		component: First,
		children: [
			{
				path: '/', // 默认路由
				component: FirstHome
			},
			{
				path: 'introduce', // 介绍 /
				component: FirstIntroduce
			},
			{
				path: 'about', // 关于 /
				component: FirstAboutUs
			},
			{
				path: 'contract', // 联系我们 /
				component: FirstContract
			},
			{
				path: 'down', // 下载 /
				component: FirstDown
			},
		]
	},
	{
		path: '/article/:id',
		component: Webview
  },
  // 二维码扫描登录
  {
    path: '/qrlogin',
    component: QrLogin
  },
	{
		path: '*',
		redirect: '/first'
	} /**重定向默认找不到路由进入 */
]
var router = new VueRouter({
	routes
})

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
