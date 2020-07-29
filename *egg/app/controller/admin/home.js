'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const result = await this.ctx.model.Order.aggregate([
    //   {
    //     $lookup: {
    //       from: 'product',
    //       localField: 'orderId',
    //       foreignField: 'orderId',
    //       as: 'items',
    //     },
    //   },
    // ]);
    // this.ctx.body = await this.service.tool.getVerCode();

    const {app, query} = this.ctx;
    // 给谁发, socket连接的id
    const id = query.id;
    const nsp = app.io.of('/');
    if(nsp.sockets[id]){
     // 通过id给指定socket连接发送消息
      nsp.sockets[id].emit('res', 'hello http....');
    }
    this.ctx.body = "发送成功";
    
  }
}

module.exports = HomeController;
