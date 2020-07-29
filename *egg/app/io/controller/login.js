'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async index() {
    const {app, socket, logger, helper} = this.ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    // 根据id给指定连接发送消息
    console.log(socket.request.args[0]); // 聊天信息
    const loginStr = socket.request.args[0] + '';
    if (loginStr.length > 0) {
      console.log('loginStr = ',loginStr)
      const item = JSON.parse(loginStr)
      console.log('获取的登录数据为： ', item.loginNam)
      // 加入room
      socket.join('room')
    }
    const loginItem = {};
    loginItem.socketIo = id;
    nsp.sockets[id].emit('login', JSON.stringify(loginItem));
  }
}

module.exports = ChatController;
