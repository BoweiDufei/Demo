'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 用户管理
 */
class TestController extends Controller {

  /**
   * @summary 测试
   * @description 测试
   * @router get /api/signtest
   * @response 200 baseResponse 创建成功
   */
  async index() {
    // const order = new this.ctx.model.Order();
    // order.desc = '第二个订单';
    // order.totalPrice = 200;
    // const result = await order.save();
    // console.log(`id为${result._id}`);
    // if (result != null) {
    //   for (let index = 0; index < 5; index++) {
    //     const randomInt = parseInt(Math.random() * 40);
    //     await this.ctx.model.Product.create({
    //       orderId: result._id,
    //       name: '皮蛋' + randomInt,
    //       price: 121 + randomInt,
    //       number: parseInt(Math.random() * 162),
    //     });
    //   }
    // }
    // const result = await this.ctx.model.Order.aggregate([
    //   {
    //     $lookup: {
    //       from: 'product',
    //       localField: '_id',
    //       foreignField: 'orderId',
    //       as: 'items',
    //     },
    //   },
    // ]);
    // 使用redis加速
    const info = await this.ctx.service.cache.get('navInfo');
    if (info) {
      this.ctx.body = info;
    } else {
      // 从数据库中查找
      await this.ctx.service.cache.set('navInfo', '存储到redis的数据', '5');
      this.ctx.body = '数据库查找获取数据';
    }

  }

  /**
   * @summary 下载地址
   * @description 测试
   * @router get /api/uploadPath
   * @response 200 baseResponse 创建成功
   */
  async loadpath() {
    const path = await this.ctx.service.tool.getUploadFile('abc.jpg');
    console.log(path);
    this.ctx.body = path;
  }
}

module.exports = TestController;
