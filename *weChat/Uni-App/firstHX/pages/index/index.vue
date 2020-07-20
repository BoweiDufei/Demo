<template>
	<view class="container">
		<view v-for="(item,index) in list" :key="index">
		    <swipper v-if='item.type==="1"' :obj="item" @jump='jumpMethod'></swipper>
			{{item.type}}
		</view>
	</view>
</template>

<script>
	import swipper from '../../components/dbw-swipper/dbw-swipper.vue'
	export default {
		components:{
			swipper
		},
		mounted() {
			console.log('登录')
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				list: []
			}
		},
		methods: {
			onLoad(options){
				console.log('onLoad')
			},
			btnClickMethod(){
				uni.startPullDownRefresh()
			},
			jumpMethod(jumpItem){
				console.log(jumpItem)
			},
			async onPullDownRefresh(){
				const resultList = [
					{
						"type":"1",
						"interval":2000,
						"duration":1000,
						"autoplay":true,
						"height":"500rpx",
						"indicatorDots":true,
						"elements":[
							{
								"pic":"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
								"mode":"aspectFill",
								"jump":"https://www.baidu.com"
							},
							{
								"pic":"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
								"mode":"aspectFill",
								"jump":"https://www.baidu.com"
							},
						]
					},
					{
						"type":"2",
						"elements":[]
					},
					{
						"type":"3",
						"elements":[]
					}
				];
				this.list = [];
				this.list = this.list.concat(resultList)
				console.log(this.list)
				uni.stopPullDownRefresh()
			}
		}
	}
</script>

<style>
	
</style>
