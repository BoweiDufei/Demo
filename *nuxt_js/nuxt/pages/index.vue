<template>
  <div class="container">

    <!-- 顶部导航 -->
    <TopNav :topElementClick="topClick"/>

    <div class="btmSection">
      <div class="mainView">
        <nuxt-child/>
      </div>
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
import TopNav from '../components/TopNav.vue'
export default {
  data() {
    return {

    }
  },
  mounted() {
      this.$router.push('/home')
  },
  methods: {
    topClick(index){
      console.log(index)
      switch (index){
        case 0: // 首页
        {
          this.$router.push('/home')
        }
        break;
        case 1: // 视频
        {
          this.$router.push('/video')
        }
        break;
        case 2: // 咨询
        {
          this.$router.push('/advice')
        }
        break;
        case 3: // 赛事
        {
          this.$router.push('/game')
        }
        break;
        case 4: // 关于我们
        {
          this.$router.push('/about')
        }
        break;
      }
    }
  },
  components:{
    TopNav
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: center;
  background-color: black;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591704008720&di=eecd8a12e76d22cc1ba45a0f6f2e9b61&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1309%2F09%2Fc1%2F25437547_25437547_1378690689437.jpg');
  background-repeat: no-repeat;  
  background-size: 100% 100%;
}

.btmSection{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.mainView{
  width: 1170px;
  height: 100%;
}



</style>
