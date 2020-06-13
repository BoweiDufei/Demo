<template>
  <div class="carouseOutContainer">
    <div class="top-view">
      <el-button class="addBtn" type="primary" @click="dialogFormVisible = true">新增</el-button>

      <el-dialog title="图片轮播图" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="form.pic" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.linker" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转" :label-width="formLabelWidth">
          <el-input v-model="form.jump" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureBtnClick">确 定</el-button>
      </div>
    </el-dialog>

    </div>
    <div class="section-view">
      <div class="secton-item" v-for="(item,index) in pics" :key="index">
        <img :src="item.pic" alt="" srcset="">

        <div class="sectionMiddle">
          <b>{{item.title}}</b>
          <b>{{item.desc}}</b>
        </div>

        <div class="sectionClose">
          <el-button @click="colseBtnClick(item)" class="coloseBtn" type="danger" icon="el-icon-delete" circle></el-button>
        </div>

      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确定要删除当前图片吗</span>
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
      const result = await this.$server.getCarousels()
      // console.log(result)
      this.pics = result.data
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      deleteId:'',
      form: {
          title: '',
          desc: '',
          pic: '',
          linker: '',
          jump: '',
      },
      pics:[]
    }
  },
  methods:{
    async sureBtnClick(){
      // this.dialogFormVisible = false
      if(this.form.pic.length == 0) {
        return
      }
      const result = await this.$server.addCarousel(this.form)
      console.log(result)
      if(result.code == 0){
        this.$notify({
          title: '提示',
          message: '新增图片轮播图成功',
          duration: 2000
        });
        this.updateCarouses();
      }
    },
    async updateCarouses(){
      const result = await this.$server.getCarousels()
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
      const result = await this.$server.deleteOneCarousel(item)
      console.log(result)
      if(result.code == 0){
        this.updateCarouses();
      }
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