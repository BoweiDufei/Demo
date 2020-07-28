官网https://socket.io/

在node.js中使用socket.io
1， npm i socket.io --save
2， 使用express建立socket.io 
**********************************************************************
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
io.on('connection', socket => { /* ... */ });
server.listen(3000);
**********************************************************************

会在 localhost:3000/socket.io/socket.io.js 

3， 客户端引入 地址

demo步骤：https://socket.io/get-started/chat/


服务端发送数据有两种形式
socket.emit('msg', data) // 谁给我发的，我就返回给谁，可以实现机器人
io.emit('msg', data)     // 群发

socket.io 可以跨域

群聊发送聊天记录可以显示当前名字操作
服务器监听/chat 路由，并且获取名字参数 ?name=张三
渲染html后，提交数据的时候，将名字带入 socket.emit('msg', {name:'张三',msg:'提交的信息'})


