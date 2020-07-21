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


// 

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI);

const routes = [{
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
	router
}).$mount('#app')
