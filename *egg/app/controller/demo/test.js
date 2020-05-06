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
    // const info = await this.ctx.service.cache.get('navInfo');
    // if (info) {
    //   this.ctx.body = info;
    // } else {
    //   // 从数据库中查找
    //   await this.ctx.service.cache.set('navInfo', '存储到redis的数据', '5');
    //   this.ctx.body = '数据库查找获取数据';
    // }
    // const total = 20;
    // for (let i = 0; i < total; i++) {
    //   console.log(i);
    //   const order = new this.ctx.model.Order();
    //   order.desc = `这是第${i}个订单`;
    //   order.totalPrice = i * i;
    //   const orderResutl = await order.save();
    //   if (orderResutl) {
    //     for (let j = 0; j < 30; j++) {
    //       const product = this.ctx.model.Product();
    //       product.orderId = orderResutl._id;
    //       product.name = `这是第${i}个订单下-第${j}个产品`;
    //       product.price = (i + 1) * (j + 1);
    //       product.number = i + j;
    //       await product.save();
    //     }
    //   }
    // }

    console.time('begin');
    const result = await this.ctx.model.Order.aggregate([
      {
        $lookup: {
          from: 'product',
          localField: '_id',
          foreignField: 'orderId',
          as: 'items',
        },
      },
      {
        $match: {
          totalPrice: {
            $gt: 30,
            $lt: 80,
          },
        },
      },
      {
        $project: {
          desc: 1,
          totalPrice: 1,
          items: {
            $filter: {
              input: '$items',
              as: 'a',
              cond: { $gt: [ '$$a.price', 40 ] },
            },
          },
        },
      },
    ]);

    // console.time('begin');
    // const result = await this.ctx.model.Order.find({
    //   totalPrice: {
    //     $gt: 10,
    //   },
    // });

    // const list = [];
    // for (let index = 0; index < result.length; index++) {
    //   const element = result[index];
    //   const target = JSON.parse(JSON.stringify(element));
    //   const _id = element._id;
    //   const item = await this.ctx.model.Product.find({ orderId: _id,
    //     price: {
    //       $gt: 500,
    //     },
    //   });
    //   target.items = item;
    //   list.push(target);
    // }


    // 过滤子文档，$fliter比多次查询拼装效率高
    console.timeEnd('begin');
    this.ctx.body = JSON.stringify(result);
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
