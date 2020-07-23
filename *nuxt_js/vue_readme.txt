0，卸载vue-cli 2.0 
npm uninstall vue-cli -g

1，安装vue-cli 3.0 
npm install -g @vue/cli

2，创建一个 vue项目
vue create XXX

3，cd XXX, 
运行 npm run serve 
编译 npm run build

npm install vue-router axios vuex -s

vscode 安装vue插件 Vue 2 Snippets

vue数据格式
{
  data(){
    return {

    }
  }, // data是 方法
  mounted(){} // 方法
  destroyed(){} // 方法

  computed:{} // 对象
  methods:{} //对象
}
// scoped 只作用当前组件
<style lang="scss" scoped>
</style>


1，####################
v-for需要绑定key
    <div v-for="(item,key) in list" :key="key">
      {{item}}
    </div>
2，###################
绑定属性 <img :src="imgsrc" alt="" srcset="">
3，绑定html
<div v-html="myhtml"></div>   // 可以解析myhtml:'<h1>我是主标题</h1>'
4，动态绑定style
<div :class="{red:redFlag}">
  我是动态样式
</div>
多个判断 ： <div :class="{red:redFlag,blue:!redFlag}">
动态内联样式：<div class="red" :style="{width:boxWidth+'px'}">
###################
5，获取dom节点元素 v-model 双向绑定。
   使用ref来获取：<input type="text" ref="myinput">
   获取方式：alert(this.$refs.myinput.value)
   使用refs来动态更改box元素颜色 this.$refs.myinput.style.background='red';
6，执行方法传值
<button @click="clickDeleteData('aaa')">传值</button>
事件对象传值 最常用两个点：1 获取dom节点 2，获取自定义属性值
<button data-aid='123' @click="clickEventFn($event)">事件对象</button>
事件对象传值，处理dom节点方法
clickEventFn(event){
    // event.srcElement 表示dom节点
    event.srcElement.style.background='blue'
}
获取自定义属性节点值data-aid
clickEventFn(event){
  console.log(event.srcElement.dataset.aid); // 获取自定义属性的值
  // 打印结果是123 小程序用的比较多
}
7################
获取input输入的键盘值
<input type="text" ref="myinput" @keydown="doAdd($event)">
doAdd(event){
  console.log(event.keyCode)
}
当event.keyCode = 13的时候是回车键
当checkbox改变时进入方法
<input type="checkbox" @change="inputChange">

8$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
组件的使用，
0，创建组件 
  暴露一个外部传值用的属性，与data同一级
  props: {
    msg: String 
  },
1，在scropt中引入组件  import MyHome from './components/MyHome.vue'
2，挂载组件
components: {
  MyHome
}
3，在模板中使用
<MyHome msg="暴露属性传值"/>

9$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
axios的使用
1> npm install axios -s
2> 哪里使用就在哪里引用（和原生请求不一样）
import axios from 'axios'
3> 使用
const result = await axios.get('http://localhost:3000?id=xxx');

10 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
父组件给子组件传值
1> 父组件调用子组件的时候，绑定动态属性
<v-header :title="" />
2，子组件里面通过props接受父组件传过来的值

父组件给子组件传递方法（很牛逼的功能，甚至可以直接把父组件传递给子组件）---------
1> 父组件中定义一个方法run(){}
2> 引用子组件并绑定方法<MyHome msg="暴露属性传值" :run="run" />
3> 在子组件中设置props 
  props: {
    msg: String,
    run: Function
  },
4> 子组件中调用父类方法 <button @click="run">点击执行方法</button>

父组件把自己传递给子组件方法 (关键点 props中 home:Object)
1> 引用子组件并绑定方法<MyHome msg="暴露属性传值" :home="this" />
2> 子组件中新增
  props: {
    home: Object,
  }
3> 调用 this.home.appMsg \ this.home.run()

11 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
父组件主动获取子组件的数据和方法
  1> 使用ref进行定位调用 <ChildComponent ref="childComponent"/>
  2> 在父组件里面通过 
  this.$refs.childComponent.方法() 调用子组件方法
  this.$refs.childComponent.属性 调用子组件属性

子组件组主动获取父组件的数据和方法
  this.$parent.属性
  this.$parent.方法()

12 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
非父子组件传值 / 兄弟组件传值
使用世界广播的方式来实现 
1> 在model文件夹下新建一个emptyValue.js文件
2> 在emptyValue中添加代码
  import Vue from 'vue'
  export default new Vue()
3> 在兄弟组件中分别引入emptyValue
  import emptyValue from '../model/emptyValue'
4> 发布广播
  emptyValue.$emit('a',111)
5> 在其他兄弟组件中mounted()方法中监听广播
  emptyValue.$on('a',function (params) {
    console.log('检测到了数据'+params)
  })



13 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
官网：https://router.vuejs.org/zh/guide/#html
路由 vue-router
安装1、 npm install vue-router -s
   2、 在main.js 中引入 
      import VueRouter from 'vue-router'
      Vue.use(VueRouter)
   3、配置路由，访问规则
      1，创建组件、引入组件
          import MyHome from './components/MyHome.vue'
          import ChildComponent from './components/ChildComponent.vue'
      2，定义路由 （建议复制）
          const routes = [
            { path: '/myhome', component: MyHome },
            { path: '/childcomponent', component: ChildComponent },
            { path: '*', redirect: '/myhome' } /**重定向默认找不到路由进入 */
          ]
      3，实例化VueRouter
          const router = new VueRouter({
            routes // short for `routes: routes`
          })
      4，挂载
          new Vue({
            render: h => h(App),
            router,
          }).$mount('#app')
      5，在根组件中放置路由出口
          <router-view></router-view> 放在App.vue里面
      6，设置路由切换按钮
          <router-link to="/myhome">myhome</router-link>

14 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
动态路由 
  1> 新建组件 Content.vue
  2> main.js中引入
     import Content from './components/Content.vue'
     { path: '/content/:id', component: Content },
  3> 触发跳转 <router-link to="/content/123">跳转新闻详情</router-link>
     <router-link :to="'/content/'+index">跳转新闻详情</router-link> （注意这种写法）
  4> 在Content组件中使用id方法： {{this.$route.params.id}}
     同理，如果获取?拼接后面的参数：{{this.$route.query.id}}


15 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
编程式导航 
     path路由跳转
  1> this.$router.push({path: '/content/123123'}); 
  2> 命名路由 
     this.$router.push({name: 'product'}) // 不传参
     this.$router.push({name: 'content',params:{id:'lfkdjaklsdf'}}) // 传参

     this.$router.push({ path: '/first/th' , query:{'id':'lfkdjaklsdf'}});

     注意query传值是可见的，?和&拼接形式
     params传值不是可见的，是判断 / 后参数来取值的

     history 了解

16 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
嵌套路由
  0> 新建几个子路由 UserList、AddUser
  1> 新建主路由 MainUser.vue
  2> main.js 中引用MainUser 和 UserList、AddUser
     import MainUser from './components/MainUser.vue'
     import AddUser from './components/user/AddUser.vue';
     import UserList from './components/user/UserList.vue';
  3> 配置嵌套路由
     {
        path: '/mainUser' ,
        component: MainUser,
        children: [
          {
            path: '/',  // 默认路由
            component: AddUser
          },
          {
            path: 'adduser', // 注意没有 /
            component: AddUser
          },
          {
            path: 'userlist', // 注意没有 /
            component: UserList
          },
          // 重点来了，传参
          {
            path: ':id',
            component: Four,
          }
        ]
      }
  4> 在MainUser配置路由分支
    <div class="leftBlock">
      // 一定要注意 router-link to="" 路径要有/
      <router-link to="/mainUser/adduser">增加用户</router-link>
      <br>
      <router-link to="/mainUser/userlist">用户列表</router-link>
    </div>
    <div class="rightBlock">
      <router-view></router-view>
    </div>

    // 子路由传参 要提前在main.js中匹配子路由 
    {
      path: ':id',
      component: Four,
    }
    this.$router.push({ path: '/first/aaaaa'}); 
    下个界面接console.log(this.$route.params);

    // ? 传参
    this.$router.push({ path: '/first/th' , query:{'id':'lfkdjaklsdf'}});
    下个界面接console.log(this.$route.query);

17 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
VUEX 解决不同组件数据共享以及数据持久化
小项目不建议使用vuex 建议使用localstorage
安装vuex     npm install vuex --save
使用 1，在src下新建一个vuex的文件夹
    2，在vuex文件夹下新建一个store.js
    3，在store.js中添加代码

    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex);
    /**1，在vue中主要用于存储数据 */
    var state = {
      count:1
    }
    /**2，mutations 主要放的是方法，用于改变state中的数据 */
    var mutations = {
      increseCount(){
        state.count++;
      },
      setCountNumber(state, value){ // 直接修改count数值 注意参数
        state.count = value;
      }
    }
    const store = new Vuex.Store({
      state,
      mutations
    })
    export default store

    4> vuex的使用 （展示数据）
      1、在<script> 中引入 import store from '../../vuex/store.js'
      2、在<script> 中注册  要与data并列平行
         export default {
          data() {
            return {
              
            }
          },
          store,
        }
      3、在合适的地方使用 {{this.$store.state.count}}

      改变数据： this.$store.commit('increseCount') //触发increseCount方法
      如果直接修改数据 this.$store.commit('setCountNumber',100)



    


扩展：
子组件给父组件传值使用$emmit
<button type="default" @click="sendNumberMethod">给父组件传值</button>

sendNumberMethod(){
  console.log('sendNumberMethod')
  this.$emit('myEven', this.myNum)
}

<test msg='标题' @myEven='getNumber'></test>




非常重要
****************************************************************************
vue项目引入bootstrap正确姿势
https://www.cnblogs.com/freephp/p/11671521.html
