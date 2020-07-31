<template>
  <div class="home">
    <!-- <el-carousel class="home-swipper" arrow="never">
			<el-carousel-item class="home-out-image" v-for="item in 4" :key="item">
				<img class="swipper-image" src="../assets/bridge.jpeg" alt="">
			</el-carousel-item>
    </el-carousel>-->

    <div><label for="">目标</label> <input type="text" v-model="targetIO"></div>
    <br>
    <div><label for="">内容</label> <input type="text" v-model="contentMsg"></div>

    <button @click="sendMsgToSomeOne">发送</button>

    <div class="banner">
      <div class="banner-inner">
        <div
          @click="bannerItemClick(index)"
          :class="[index==bannerSelectedIndex?'banner-item-selected':'banner-item']"
          v-for="(item, index) in banners"
          :key="item"
        >{{ item }}</div>
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
    this.$socket.on("connect", function () {
      console.log("连接成功");
    });
    this.$socket.on("login", function (data) {
      console.log("login = ",data);
      const item = JSON.parse(data)
      console.log('socketIO = ', item.socketIo)
    });
    this.$socket.on("chatToSomeOne", function (data) {
      console.log("chatToSomeOne = ",data);
    });
    this.$socket.on("room", function (data) {
      console.log("room = ",data);
    });
    // 
    this.$socket.on("logOut", function (data) {
      console.log("logOut = ",data);
    });
  },
  data() {
    return {
      item: ["a", "b", "c"],
      banners: ["首页", "介绍", "room", "联系方式", "下载"],
      bannerSelectedIndex: 0,
      targetIO: '',
      contentMsg:''
    };
  },
  methods: {
    sendMsgToSomeOne(){
      const item = {};
      item.target = this.targetIO;
      item.msg = this.contentMsg
      this.$socket.emit('chatToSomeOne', JSON.stringify(item));
    },
    bannerItemClick(index) {
      this.bannerSelectedIndex = index;
      switch (index) {
        case 0: // 首页
          {
            console.log(this.$socket.connected);
            if (this.$socket.connected === false) {
              this.$socket.connect();
            }
            const item = {};
            item.loginNam = 'dubowei'
            item.psd = 'dbw111'
            item.device = 'ios'
            item.secret = 'loginSecret'
            const itemStr = JSON.stringify(item);
            this.$socket.emit("login", itemStr);
            // this.$router.push({
            //   path: "/first/",
            // });
          }
          break;
        case 1: // 介绍
          {
            this.$socket.emit("chat", "111111111111");
            // this.$router.push({
            //   path: "/first/introduce",
            // });
          }
          break;
        case 2: // 关于我们
          {
            const item = {};
            item.room = "room";
            item.msg = this.contentMsg
            this.$socket.emit("chatInRoom", JSON.stringify(item));
          }
          break;
        case 3: // 联系我们
          {
            this.$router.push({
              path: "/first/contract",
            });
          }
          break;
        case 4: // 下载
          {
            // 断开连接
            this.$socket.emit('logOut');
          }
          break;
        default:
          break;
      }
    },
  },
};
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
  background-color: #2f2f2f;
}

.banner-item-selected {
  background-color: #f13a3a;
  width: 100px;
  text-align: center;
  cursor: pointer;
}
</style>
