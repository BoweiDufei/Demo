<template>
	<view class="container">
		<test msg='标题' @myEven='getNumber'></test>
		fff
	  <view class="content">
		  <image class="content-image" mode="aspectFill" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2873034231,1191081182&fm=26&gp=0.jpg"></image>
		  <view v-for="(item,index) in list" :key="index">
		  <button type="primary" @click="btnClickMethod(index)">我是按钮</button>
		  </view>
		  {{this.$store.state.count}}
		  <button @click="changeNumberMethod" type="default">改变vuex</button>
	  </view>
	</view>
</template>

<script>
	import test from '../../components/dbw-test/dbw-test.vue'
	import store from '../../store/store.js'
	export default {
		store,
		components:{
			test
		},
		data() {
			return {
				list:[
					'从小宝',
					'大栗子',
					'妞儿'
				]
			}
		},
		methods: {
			btnClickMethod(index){
				console.log(index);
			},
			getNumber(number){
				console.log('父组件获取到',number)
			},
			changeNumberMethod(){
				this.$store.commit('increseCount')
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.content{
			color: red;
		}
	}
	.content-image{
		width: 100%;
	}
</style>
