'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.ctx.model.Order.aggregate([
      {
        $lookup: {
          from: 'product',
          localField: 'orderId',
          foreignField: 'orderId',
          as: 'items',
        },
      },
    ]);
    console.log(JSON.stringify(result));
    console.log(`md5加密:${await this.service.tool.dbwMd5('123456')}`);
    this.ctx.body = await this.service.tool.getVerCode();
  }
}

module.exports = HomeController;
