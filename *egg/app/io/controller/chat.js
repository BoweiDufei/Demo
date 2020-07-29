'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async index() {
    const {app, socket, logger, helper} = this.ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    // 根据id给指定连接发送消息
    console.log(socket.request.args[0]); // 聊天信息
    nsp.sockets[id].emit('res', "hello...");
    // // 指定房间连接信息列表
    // nsp.adapter.clients([room], (err, clients) => {
    //     console.log(JSON.stringify(clients));
    // });
    // //  给指定房间的每个人发送消息
    // this.ctx.app.io.of('/').to(room).emit('online', this.ctx.socket.id+ "上线了");
  }

  // 给某人发送信息
  async chatToSomeOne(){
    const {app, socket, logger, helper} = this.ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    // 根据id给指定连接发送消息
    console.log(socket.request.args[0]); // 聊天信息
    const loginStr = socket.request.args[0] + '';
    if (loginStr.length > 0) {
      console.log('loginStr = ',loginStr)
      const item = JSON.parse(loginStr)
      console.log('targetIo： ', item.target)
      nsp.sockets[item.target].emit('chatToSomeOne', item.msg);
    }
  }
}

module.exports = ChatController;
