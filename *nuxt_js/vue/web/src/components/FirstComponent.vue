<template>

	<div class="home">

		<el-carousel class="home-swipper" arrow="never">
			<el-carousel-item class="home-out-image" v-for="item in 4" :key="item">
				<img class="swipper-image" src="../assets/bridge.jpeg" alt="">
			</el-carousel-item>
		</el-carousel>

		<div class="banner">
			<div class="banner-inner">
				<div @click="bannerItemClick(index)" :class="[index==bannerSelectedIndex?'banner-item-selected':'banner-item']"
				 v-for="(item, index) in banners" :key="item">
					{{ item }}
				</div>
			</div>
		</div>

		<div class="childView">
			<router-view></router-view>
		</div>

	</div>

</template>

<script>
	export default {
		mounted() {
			this.$router.push({
				path: '/first/'
			});
		},
		data() {
			return {
				item: [
					'a', 'b', 'c'
				],
				banners: [
					'首页',
					'介绍',
					'关于我们',
					'联系方式',
					'下载'
				],
				bannerSelectedIndex: 0,
			}
		},
		methods: {
			bannerItemClick(index) {
				this.bannerSelectedIndex = index;
				switch (index) {
					case 0: // 首页
						{
							this.$router.push({
								path: '/first/'
							});
						}
						break;
					case 1: // 介绍
						{
							this.$router.push({
								path: '/first/introduce'
							});
						}
						break;
					case 2: // 关于我们
						{
							this.$router.push({
								path: '/first/about'
							});
						}
						break;
					case 3: // 联系我们
						{
							this.$router.push({
								path: '/first/contract'
							});
						}
						break;
					case 4: // 下载
						{
							this.$router.push({
								path: '/first/down'
							});
						}
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.home {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.home-out-image {
		width: 100%;
		height: 50vw;
	}

	.home-swipper {
		width: 100%;
		height: 50vw;
	}

	.swipper-image {
		width: 100%;
	}

	.banner {
		width: 100%;
		height: 50px;
		background-color: #2f2f2f;
		color: white;
		font-size: 15px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.banner-inner {
		height: 100%;
		width: 500px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		line-height: 50px;
	}

	.banner-item {
		width: 100px;
		text-align: center;
		cursor: pointer;
		background-color: #2F2F2F;
	}

	.banner-item-selected {
		background-color: #F13A3A;
		width: 100px;
		text-align: center;
		cursor: pointer;
	}
</style>
