<template lang="">
  <div @click="outContainerClick">
    <iframe ref="refIframe" class="myIframe" src='https://www.baidu.com'></iframe>
    <button @click="sureBtnClick">确定</button>
  </div>
</template>

<script>
import ev from '../model/EmitEvent'
export default {
  data() {
    return {
      list: ['a', 'b', 'c', 'd']
    }
  },
  props:{
    first_title: String,
    run: Function
  },
  methods: {
    outContainerClick(){
      ev.$emit('HHH','data - 01')
    },
    sureBtnClick(){
      console.log(this.$refs.refIframe.contentWindow.document.body)
      

    }
  },
}
</script>

<style lang="scss" scoped>

.myIframe{
  width: 100vh;
  height: 100vh;
}
  
</style>