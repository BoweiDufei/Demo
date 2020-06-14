<template>
  <div class="articleController">

    <div class="artM">

      <h1 class="title">
        {{article.title}}
      </h1>
      <h3 class="desc">
        {{article.desc}}
      </h3>
      <div class="content" v-html="article.content"></div>

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
  async mounted() {
    console.log('mounted')
    const item = { 'id':this.$route.query.articleId }
    const result = await this.$server.getDetailArticle(item)
    this.article = result.data[0]
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
</style>