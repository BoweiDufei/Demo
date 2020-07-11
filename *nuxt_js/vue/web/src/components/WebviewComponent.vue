<template>
  <div class="articleController">

    <div class="artM">

      <h1 class="title">
        {{titleStr}}
      </h1>

      <div class="content" v-html="myContent">

      </div>

    </div>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  async mounted() {
    // 5f08115589bd9f234a501a63
    const articleId = this.$route.params.id+'';
    // const hostIp = 'http://120.53.248.129:7001';
    const hostIp = 'http://127.0.0.1:7001';
    const detailArticleUrl = hostIp + '/api/getArticleDetailById?id='+articleId;
    if (articleId.length > 0) {
      const result = await axios.get(
        detailArticleUrl,
      );
      console.log(result);
      const data = result.data;
      const code = data.code+'';
      if (code === '0') {
        const dataList = data.data;
        if (dataList.length > 0) {
          const infoDict = dataList[0];
          const articleContent = infoDict.articleStr;
          this.contentStr = articleContent;
          this.titleStr = infoDict.titleStr;
        }
      }
    }

    const uid = this.$route.query.uid+'';
    if (uid.length > 0) {
      // uid获取数据
      console.log(uid);
    }
  },
  data() {
    return {
      titleStr: '',
      contentStr: '',
    }
  },
  computed: {
    myContent(){
      if(typeof this.contentStr == 'string'){
        const infoStr = this.contentStr;
        const word1 = infoStr.replace('visibility: hidden','visibility: visible')
        const word2 = word1.replace(new RegExp('http://127.0.0.1:8899/app','g'),"http://127.0.0.1:7001");
        const word = word2.replace(new RegExp('data-src','g'),"src");
        return word;
      }else{
        return '';
      }
    }
  },
  methods:{
    btnclick(){
      // console.log('aaa = ',this.$route.params.id);
      const uid = this.$route.query.uid+'';
      if (uid.length > 0) {
        console.log(uid);
      }
    },
  },
}
</script>

<style lang="scss">
  
.articleController{
  box-sizing: border-box;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
}

.artM{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title{
  margin-bottom: 20px;
  line-height: 1.3em;
  font-size: 1.5em;
  color: #383838;
  font-weight: 600;
  text-transform: uppercase;
}
.desc{
  margin-bottom: 20px;
}
.content{
  font-size: 20px;
}
.content img{
  width: 85% !important;
  display: block;
  text-align: center;
  margin: auto;
}
.rich_media_content {
  visibility: visible;
}
</style>