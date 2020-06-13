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
    props:{
      list:Array
    },
    data () {
      return {
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
      console.log(`this.list = ${this.list}`)
    },
    computed: {
      banners(){
        var b_list = []

        for (let index = 0; index < this.list.length; index++) {
          const element = this.list[index];
          b_list.push(element.pic)
        }

        return b_list
      }
    },
}
</script>

<style scoped>

.wrapperImg{
  width: 100%;
  height: 500px;
}
    
</style>