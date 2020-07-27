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




