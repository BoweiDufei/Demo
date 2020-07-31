<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// ES6 import
import io from 'socket.io-client';
export default {
  name: 'App',
  methods: {
  },
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
body,html{
	height:100%;
	width:100%;
	background:white;
	overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.item{
  flex: 1;
  background-color: white;
  margin-left: 10px;
}
</style>
