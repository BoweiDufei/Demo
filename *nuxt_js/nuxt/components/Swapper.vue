<template>
    <div>
        <div v-swiper:mySwiper="swiperOption" class="wrapperContainer">
            <div class="swiper-wrapper">
            <div class="swiper-slide" :key="banner" v-for="banner in banners">
                <img :src="banner" class="wrapperImg">
            </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    components:{
        Swiper,
        SwiperSlide
    },
    data () {
      return {
        banners: [ 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2550227348,24176815&fm=15&gp=0.jpg', 
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2550227348,24176815&fm=15&gp=0.jpg', 
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2550227348,24176815&fm=15&gp=0.jpg' ],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
          },
          autoplay:{
            delay:2500,
            disableOnInteraction: false,
          }
        },
      }
    },
    mounted() {
      // this.mySwiper.slideTo(3, 1000, false)
    }
}
</script>

<style scoped>

.wrapperImg{
  width: 100%;
  height: 500px;
}
    
</style>