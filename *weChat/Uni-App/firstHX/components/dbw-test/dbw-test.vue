<template>
	<view>
		这是我的组件 dbw-test  - {{msg}}
		<view>
			<button type="default" @click="sendNumberMethod">给父组件传值</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myNum:300,
			};
		},
		props:{
			msg:String
		},
		methods:{
			sendNumberMethod(){
				console.log('sendNumberMethod')
				this.$emit('myEven', this.myNum)
			}
		}
	}
</script>

<style>

</style>
