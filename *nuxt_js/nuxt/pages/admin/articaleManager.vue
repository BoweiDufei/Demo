<template>
  <div class="carouseOutContainer">

    <div class="section-view">
      <div @click="articleClickMethod(item)" class="secton-item" v-for="(item,index) in pics" :key="index">
        <img :src="item.imgSrc.replace('http://127.0.0.1:8899/app','http://127.0.0.1:7001')" alt="" srcset="">

        <div class="sectionMiddle">
          <b>{{item.titleStr}}</b>
          <b>{{item.contentStr}}</b>
        </div>

        <!-- <div class="sectionClose">
          <el-button @click="colseBtnClick(item)" class="coloseBtn" type="danger" icon="el-icon-delete" circle></el-button>
        </div> -->

      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确定要删除当前文章吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteImgBtnClick">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  async mounted() {
      const result = await this.$server.getArticleList()
      console.log(result)
      this.pics = result.data
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      deleteId:'',
      pics:[]
    }
  },
  methods:{
    async updateArticles(){
      const result = await this.$server.getArticleList()
      // console.log(result)
      this.pics = result.data
    },
    async colseBtnClick(item){
      console.log(item._id)
      this.dialogVisible = true
      this.deleteId = item._id;
    },
    async deleteImgBtnClick(){
      this.dialogVisible = false
      console.log(`this.deleteId = ${this.deleteId}`)
      const item = {}
      item._id = this.deleteId;
      const result = await this.$server.deleteOneArticle(item)
      console.log(result)
      if(result.code == 0){
        this.updateArticles();
      }
    },
    articleClickMethod(info){
      this.$router.push('/article?articleId='+info._id)
    }
  }
}
</script>

<style scoped>
  .carouseOutContainer{
    display: flex;
    background-color: steelblue;
    flex-direction: column;
  }
  .top-view{
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
  }
  .addBtn{
    height: 40px;
  }

  .secton-item{
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: silver 1px solid;
  }

  .secton-item img{
    display: block;
    width: 130px;
    height: 80px;
    margin-right: 20px;
  }
  .sectionMiddle{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
  .sectionClose{
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .coloseBtn{
    width: 50px;
    height: 50px;
  }
</style>