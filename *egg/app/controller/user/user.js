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
    ctx.validate(ctx.rule.createUserRequest, ctx.request.body);
    const mobile = ctx.request.body.mobile;
    const token = await service.actionToken.apply(mobile);
    const userinfo = await service.user.createrUser(ctx.request.body);
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
    ctx.validate(ctx.rule.loginUserRequest, ctx.request.body);
    const mobile = ctx.request.body.mobile;
    const password = ctx.request.body.password;
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


  /**
   * @summary 通过手机号删除用户
   * @description 通过手机号删除用户
   * @router post /auth/addChildrenInfo
   * @request query addChildrenInfoRequest *query
   * @response 200 baseResponse 创建成功
   */
  async addChildInfo() {
    const { ctx, service } = this;
    // 参数验证
    ctx.validate(ctx.rule.addChildrenInfoRequest, ctx.request.body);
    console.log('-----addChildInfo------');
    ctx.helper.success(ctx, await service.user.addChildInfo(ctx.request.body.info));
  }

  /**
   * @summary 判断是否存在某数据
   * @description 判断是否存在数据
   * @router post /auth/containObj
   * @request query containChildrenInfoRequest *query
   * @response 200 baseResponse 创建成功
   */
  async containChildInfo() {
    const { ctx } = this;
    // 参数验证
    ctx.validate(ctx.rule.containChildrenInfoRequest, ctx.request.body);
    const info = ctx.request.body.info;
    const result = ctx.currentUser.children.includes(info);
    return ctx.helper.success(ctx, result);
  }

  /**
   * @summary 存1000条
   * @description 判断是否存在数据
   * @router post /auth/saveManyChild
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async saveManyChild() {
    const { ctx, service } = this;
    // 参数验证
    // ctx.validate(ctx.rule.containChildrenInfoRequest, ctx.request.body);
    // const result = ctx.currentUser.children.includes(info);
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push(`这是第${i}条数据`);
    }
    console.log(list);
    await service.user.updateManyChildren();
    return ctx.helper.success(ctx, '存储成功');
  }

  /**
   * @summary 新增图片轮播图
   * @description 新增图片轮播图
   * @router post /auth/addOneCarousel
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async addOneCarousel() {
    const pic = this.ctx.request.body.pic;
    if (pic != null && pic.length > 0) {
      const item = this.ctx.request.body;
      item.userId = this.ctx.userId;
      const result = await this.ctx.model.Carousel.create(item);
      this.ctx.helper.success(this.ctx, result, '存储成功');
    } else {
      this.ctx.helper.fail(this.ctx, {}, '请保证有图片链接');
    }
  }

  /**
   * @summary 查询用户图片轮播图
   * @description 查询用户图片轮播图
   * @router post /api/getCarousels
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async getCarousels() {
    // const userId = this.ctx.userId
    // console.log('userid = ${userId}')
    const result = await this.ctx.model.Carousel.find();
    this.ctx.helper.success(this.ctx, result, '发送成功');
  }
  /**
   * @summary 删除某一图片轮播图
   * @description 删除某一图片轮播图
   * @router post /auth/deleteOneCarousel
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async deleteOneCarousel() {
    const _id = this.ctx.request.body._id;
    console.log('userid = ${userId}');
    const result = await this.ctx.model.Carousel.deleteOne({ _id });
    this.ctx.helper.success(this.ctx, result, '发送成功');
  }


  /**
   * @summary 新增文章
   * @description 新增文章
   * @router post /auth/addOneArticle
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async addOneArticle() {
    const content = this.ctx.request.body.content;
    if (content != null && content.length > 10) {
      const item = this.ctx.request.body;
      item.userId = this.ctx.userId;
      const result = await this.ctx.model.Article.create(item);
      this.ctx.helper.success(this.ctx, result, '存储成功');
    } else {
      this.ctx.helper.fail(this.ctx, {}, '请保证文章内容有效');
    }
  }

  /**
   * @summary 查询用户文章
   * @description查询用户文章
   * @router post /auth/getArticles
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async getArticles() {
    const result = await this.ctx.model.Article.find({ userId: this.ctx.userId });
    this.ctx.helper.success(this.ctx, result, '发送成功');
  }
  /**
   * @summary 查询用户文章
   * @description查询用户文章
   * @router get /api/getDetailArticle
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async getDetailArticle() {
    const result = await this.ctx.model.Article.find({ _id: this.ctx.query.id });
    this.ctx.helper.success(this.ctx, result, '发送成功');
  }


  /**
   * @summary 删除某一文章
   * @description 删除某一文章
   * @router post /auth/deleteOneArticle
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async deleteOneArticle() {
    const _id = this.ctx.request.body._id;
    console.log('userid = ${userId}');
    const result = await this.ctx.model.Article.deleteOne({ _id });
    this.ctx.helper.success(this.ctx, result, '发送成功');
  }

  /**
   * @summary 获取某文章爬虫
   * @description 删除某一文章
   * @router post /auth/getArticleReptile
   * @request aaa
   * @response 200 baseResponse 创建成功
   */
  async getArticleReptile() {
    const address = this.ctx.request.body.address;
    console.log(address);
    if (address === null || address.length === 0) {
      this.ctx.helper.fail(this.ctx, '请输入address');
      return;
    }
    await this.ctx.service.tool.setPcPromise2(address);
    this.ctx.helper.success(this.ctx, {}, '发送成功');
  }


  /**
   * @summary 爬虫测试
   * @description 爬虫测试
   * @router post /api/pcTestMethod
   * @request bbb
   * @response 200 baseResponse 创建成功
   */
  async pcTextMethod() {
    const address = this.ctx.request.body.address;
    console.log(`address = ${address}`);
    if (address === null) {
      this.ctx.helper.fail(this.ctx, '请输入address');
      return;
    }
    console.log('************begin************')
    const result = await this.ctx.service.tool.setPcPromise2(address);
    this.ctx.helper.success(this.ctx, result, '发送成功');
  }

}

module.exports = UserController;
