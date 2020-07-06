<template>
  <div>
    <section class="container">
      <el-input  v-model="title" placeholder="请输入标题"></el-input>
      <el-input class="eleInput" v-model="desc" placeholder="请输入描述"></el-input>
      <div class="addressDiv">
        <el-input class="eleAddressInput" v-model="address" placeholder="请输入连接地址"></el-input>
        <el-button @click="addressBtnClick" type="primary">发送</el-button>
      </div>
      <div class="quill-editor" 
          :content="content"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-quill:myQuillEditor="editorOption"
          ref="QuillEditor">
      </div>
      <div class="btn-container">
        <el-button @click="sureBtnClick" type="primary">确定</el-button>
      </div>
    
      <!-- 文件选择 -->
      <el-upload
        class="avatar-uploader"
        :action="uploadAddress"
        :headers="headInfo"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

    </section>
  </div>
</template>

<script>
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
];
export default {
  data () {
    return {
      title: '',
      desc: '',
      imageUrl:'',
      address:'',
      content: '<p>I am Example</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container:toolbarOptions,
            handlers:{
              'image': function (value) {
                  if (value) {
                      // alert('自定义图片')
                      console.log(document.querySelector('.avatar-uploader'))
                      document.querySelector('.avatar-uploader .el-upload__input').click()
                  } else {
                      this.quill.format('image', false);
                  }
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
    setTimeout(() => {
      this.content = 'i am changed'
    }, 3000)
  },
  computed: {
    uploadAddress(){
      return 'http://120.53.248.129:7001/auth/upload/single'
    },
    headInfo(){

      const token = window.localStorage.getItem("token");
      let item = {
        'Authorization':token
      }
      return item;
    }
  },
  methods: {
    async addressBtnClick(){
      console.log('addressBtnClick')
      if(this.address.length == 0){
        return
      }
      var item = {}
      item.address = this.address;
      const result = await this.$server.getArticleReptile(item)
      if(result.code == 0){
        console.log(result.data)
        this.content = result.data;
      }
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    },
    async sureBtnClick(){
      console.log('fdlkajsdlkg')
      console.log(this.content);
      let item = {}
      item.title = this.title;
      item.desc = this.desc;
      item.content = this.content;
      const result = await this.$server.addArticle(item)
      console.log(result)
      if (result.code == 0){
        this.$notify({
          title: '提示',
          message: '您新增文章成功',
          duration: 2000
        });
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
        const data = res.data
        const imgUrl = data.url
        this.imageUrl = `${this.$server.localurl}${imgUrl}`;
        console.log(this.imageUrl)
        let quill = this.myQuillEditor
        console.log(quill)
        let length = quill.getSelection().index;
        console.log(length)
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', this.imageUrl)
        // 调整光标到最后
        quill.setSelection(length + 1)
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  }
}
</script>

<style scoped>

.eleInput{
  margin-top: 10px;
  margin-bottom: 10px;
}
.addressDiv{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.eleAddressInput{
  background-color: rosybrown;
  margin-bottom: 10px;
  width: 100%;
  align-self: flex-start;
}
.container{
  background-color: lightcyan;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.btn-container{
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.quill-editor {
  min-height: 300px;
  width: 100%;
}

.avatar-uploader{
  display: none;
}

   
</style>