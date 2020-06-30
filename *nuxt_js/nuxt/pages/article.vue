<template>
  <div class="articleController">

    <div class="artM">

      <!-- <h1 class="title">
        {{article.titleStr}}
      </h1>
      <h3 class="desc">
        {{article.contentStr}}
      </h3> -->
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
        const word = infoStr.replace('visibility: hidden','visibility: visible')
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
  // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
  //   // let item = {}
  //   // item.id = query.id;
  //   // axios.defaults.headers.common["Content-Type"] = "application/json";
  //   // console.log(`http://127.0.0.1:7001/api/getDetailArticle?id=${query.id}`)
  //   // axios.get("http://127.0.0.1:7001/api/getDetailArticle",{id:query.id}).then(result=>{
  //   //   console.log(result)
  //   // })
  // },
}
</script>

<style>
.articleController{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 20px;
}

.artM{
  min-width: 300px;
  max-width: 800px;
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