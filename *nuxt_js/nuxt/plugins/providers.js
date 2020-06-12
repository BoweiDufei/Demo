import {server} from '../store/providers/http-service'
import Vue from 'vue'
//定义全局变量
Vue.prototype.$server=server;