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
   * @summary 测试
   * @description 测试
   * @router get /api/test
   * @request query createUserRequest *query
   * @response 200 baseResponse 创建成功
   */
  async test() {
    const { ctx } = this;
    const res = { };
    res.data = '成功了';
    ctx.helper.success(ctx, res);
    ctx.helper.success(ctx);
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账号/密码/类型
   * @router post /api/createUser
   * @request query createUserRequest *query
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 参数验证
    ctx.validate(ctx.rule.createUserRequest, ctx.query);
    const mobile = ctx.query.mobile;
    const token = await service.actionToken.apply(mobile);
    const userinfo = await service.user.createrUser(ctx.query);
    const res = { token, userinfo };
    console.log('create----' + userinfo);
    ctx.helper.success(ctx, res);
  }

  /**
   * @summary 健全
   * @description 创建用户，记录用户账号/密码/类型
   * @router get /auth/checkUser
   * @request query createUserRequest *query
   * @response 200 baseResponse 创建成功
   */
  async checkUser() {
    const { ctx } = this;
    console.log('check----');
    const res = { userId: ctx.state.userId };
    ctx.helper.success(ctx, res);
  }
}

module.exports = UserController;
