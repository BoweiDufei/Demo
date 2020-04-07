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
   * @summary 用户登录
   * @description 用户登录
   * @router post /api/login
   * @request query loginUserRequest *query
   * @response 200 baseResponse 创建成功
   */
  async login() {
    const { ctx, service } = this;
    // 参数验证
    ctx.validate(ctx.rule.loginUserRequest, ctx.query);
    const mobile = ctx.query.mobile;
    const password = ctx.query.password;
    // 根据mobile查找用户
    const userInfo = await service.user.findByMobile(mobile);
    console.log(`对比结果前password = ${password} mobile = ${mobile}`);
    console.log(`对比结果前locPassword = ${userInfo}`);
    const ensurePsd = await ctx.helper.md5(password);
    if (userInfo.password !== ensurePsd) {
      ctx.throw(404, `密码错误 : ${userInfo.password} and ${ensurePsd} ${password}`);
    }
    // 登录成功
    const token = await service.actionToken.apply(mobile);
    const res = { token, userInfo };
    ctx.helper.success(ctx, res);
  }

  /**
   * @summary 更新用户
   * @description 更新用户
   * @router post /auth/updateUser
   * @request query updateUserByIdRequest *query
   * @response 200 baseResponse 创建成功
   */
  async update() {
    const { ctx, service } = this;
    // 参数验证
    ctx.validate(ctx.rule.createUserRequest, ctx.query);
    const _id = ctx.query.id;
    ctx.helper.success(ctx, await service.user.updateUser(_id, ctx.query));
  }

  /**
   * @summary 删除用户
   * @description 删除用户
   * @router post /auth/deleteUserById
   * @request query deleteUserByIdRequest *query
   * @response 200 baseResponse 创建成功
   */
  async deleteUser() {
    const { ctx, service } = this;
    // 参数验证
    ctx.validate(ctx.rule.deleteUserByIdRequest, ctx.query);
    const _id = ctx.query.id;
    ctx.helper.success(ctx, await service.user.deleteUersById(_id));
  }


  /**
   * @summary 通过手机号删除用户
   * @description 通过手机号删除用户
   * @router post /auth/deleteUserByMobile
   * @request query deleteUserByMobileRequest *query
   * @response 200 baseResponse 创建成功
   */
  async deleteUserByMobile() {
    const { ctx, service } = this;
    // 参数验证
    ctx.validate(ctx.rule.deleteUserByMobileRequest, ctx.query);
    const mobile = ctx.query.mobile;
    ctx.helper.success(ctx, await service.user.deleteUersByMobile(mobile));
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
