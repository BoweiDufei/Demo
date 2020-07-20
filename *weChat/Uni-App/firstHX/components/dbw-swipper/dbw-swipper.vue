<template>
	<view>
		<swiper class="swiper" :style="{height: obj.height}" :indicator-dots="obj.indicatorDots" :autoplay="obj.autoplay" :interval="obj.interval" :duration="obj.duration">
			
			<swiper-item v-for="(item,index) in obj.elements">
				<view class="swiper-item uni-bg-red" @click="swipperItemClick(item)">
					<image class="swipperImg" :src="item.pic" :mode="item.mode"></image>
				</view>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperStyle:{},
			};
		},
		props:{
			obj:Object
		},
		methods:{
			swipperItemClick(item){
				this.$emit('jump', item.jump)
			}
		}
	}
</script>

<style>
	
	.swipperImg{
		width: 100%;
	}

</style>
