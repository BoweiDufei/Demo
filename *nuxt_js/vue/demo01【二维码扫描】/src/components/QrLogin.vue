<template>
	<div class="aboutContainer">
	  二维码登录扫描
    <img v-if="result.length==0" class="baseImgClass" :src="imgBaseSrc" alt="" srcset="">
    <div class="result">
      结果是：{{result}}
    </div>

    <button @click="regetQrImg">刷新</button>

	</div>
</template>

<script>

import axios from 'axios'
export default {
  mounted(){
    // 连接
    this.$socket.on("connect", function () {
      console.log("连接成功");
    });
    // 获取到socketid
    this.$socket.on("socketid", async socketDataStr => {
      // 获取到socketid为
      console.log('socketid = ',socketDataStr)
      const item = JSON.parse(socketDataStr)
      this.socketId = item.id;
      // 根据socketid 从服务器获取二维码图片
      const hostIp = 'http://127.0.0.1:7001';
      const getQrImageUrl = hostIp + '/api/getQrImage?id=' + this.socketId;
      const result = await axios.get(getQrImageUrl);
      const imgData = result.data.data
      console.log(imgData)
      this.imgBaseSrc = imgData;
    });

    // 收取到二维码扫描后捕捉到的消息
    this.$socket.on("qr-scan-info", async info => {
      // 收取到二维码扫描后的信息
      console.log('二维码扫描后捕捉到的信息',info)
    });

    // 收取到二维码扫描后捕捉到的消息
    this.$socket.on("chatToSomeOne", async info => {
      // 收取到二维码扫描后的信息
      console.log('二维码扫描后捕捉到的信息',info)
      this.result = info;
    });

  },
  data() {
    return {
      imgBaseSrc:'',
      result:'',
      socketId:''
    };
  },
  methods: {
    sendMsgToSomeOne(){

    },
    regetQrImg(){
      // 重新连接
      this.$socket.disconnect();
      this.$socket.connect();
    },
  },
};

</script>

<style>

.baseImgClass{
  width: 300px;
  height: 300px;
}
</style>
