'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    const msg = ctx.query.msg;
    const tokens = [ '27adf8b673391bb84d4a2c3edd55b7f5d00b2827abe53d4876aeaf7e9b9817d8' ];
    const params = {};
    params.note = msg;
    params.productFlag = '1';
    params.topic = 'cn.com.lianda.UnifiedManagementSys';
    const result = await service.apn.sendAPNS([ tokens ], params);
    console.log(result);
    ctx.body = '消息发送成功';
  }
}

module.exports = HomeController;
