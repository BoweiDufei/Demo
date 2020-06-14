<template>
  <div>
    <section class="container">
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
      imageUrl:'',
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
      return 'http://127.0.0.1:7001/auth/upload/single'
    },
    headInfo(){

      const token = localStorage.getItem("token");
      let item = {
        'Authorization':token
      }
      return item;
    }
  },
  methods: {
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
    sureBtnClick(){
      console.log('fdlkajsdlkg')
      console.log(this.content);
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