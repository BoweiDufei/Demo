<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.item{
  flex: 1;
  background-color: aqua;
  margin-left: 10px;
}
</style>
