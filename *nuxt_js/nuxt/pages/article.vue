<template>
  <div class="articleController">

    <div class="artM">

      <h1 class="title">
        {{article.titleStr}}
      </h1>
      <!-- <section>
        asdfsdf
      </section> -->
      <div class="content" v-html="articleInfo">

      </div>

    </div>

    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      article:{}
    }
  },
  computed:{
    articleInfo(){
      if(typeof this.article.articleStr == 'string'){
        const infoStr = this.article.articleStr;
        const word1 = infoStr.replace('visibility: hidden','visibility: visible')
        const word2 = word1.replace(new RegExp('http://127.0.0.1:8899/app','g'),"http://120.53.248.129:7001");
        const word = word2.replace(new RegExp('data-src','g'),"src");
        return word;
      }else{
        return '';
      }
    }
  },
  async mounted() {
    console.log('mounted')
    const item = { 'id':this.$route.query.articleId }
    console.log('item = ',item);
    const result = await this.$server.getNewDetailArticleInfo(item)
    this.article = result.data[0];
    console.log(result)
  },
}
</script>

<style>


.articleController{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
}

.artM{
  min-width: 300px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title{
  line-height: 28px;
  margin-bottom: 20px;
}
.desc{
  margin-bottom: 20px;
}
.content img{
  width: 100%;
}
.rich_media_content {
  visibility: visible;
}
</style>