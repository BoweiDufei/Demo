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
    this.ctx.body = await this.service.tool.getVerCode();
  }
}

module.exports = HomeController;
