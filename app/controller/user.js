'use strict';
const Controller = require('egg').Controller;

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账号/密码/类型
   * @router get /api/user
   * @request query createUserRequest *query
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    console.log('------------uuuu');
    console.log(service);
    console.log('------------dddd');
    service.first.method('调用一下');
    // ctx.validate(ctx.rule.createUserRequest);
    const res = { abc: 123 };
    const str = ctx.helper.dbw_json.changeObjToStr(res);
    console.log(str);
  }
}

module.exports = UserController;
