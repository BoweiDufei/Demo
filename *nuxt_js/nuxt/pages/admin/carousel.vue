<template>
  <div class="carouseOutContainer">
    <div class="top-view">
      <el-button class="addBtn">新增</el-button>
    </div>
    <div class="section-view">
      
    </div>
  </div>
</template>

<script>
export default {
  
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
</style>