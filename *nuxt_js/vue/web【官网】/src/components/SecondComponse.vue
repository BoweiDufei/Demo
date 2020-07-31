<template lang="">
  <div>
    我是Second
  </div>
</template>

<script>
import ev from '../model/EmitEvent'
export default {
  mounted() {
    ev.$on('HHH',(data)=>{
      console.log(data)
    })
  },
}
</script>

<style lang="scss" scoped>
  
</style>