'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   */
  async createrUser(payload) {
    const { ctx } = this;
    // 进行加密
    payload.password = ctx.helper.md5(payload.password);
    return ctx.model.User.create(payload);
  }

  /**
   * 更新用户
   * @param {*} _id
   * @param {*} payload
   */
  async updateUser(_id, payload) {
    const { ctx } = this;
    const user = await ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload);
  }


  /**
   * 通过id删除用户
   * @param {*} _id
   */
  async deleteUersById(_id) {
    const { ctx, service } = this;
    const user = await service.user.findById(_id);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return ctx.model.User.findByIdAndRemove(_id);
  }
  /**
   * 通过mobile删除用户
   * @param {*} _id
   */
  async deleteUersByMobile(mobile) {
    const { ctx, service } = this;
    const user = await service.user.findByMobile(mobile);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return ctx.model.User.remove({ mobile });
  }


  /**
   * 查看用户个人信息
   * @param {*} _id
   */
  async showUers(_id) {
    const { ctx, service } = this;
    const user = await service.user.findById(_id);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return this.ctx.model.User.findById(_id).populate('role');
  }

  /**
   * 根据手机号查看用户个人信息
   * @param {*} mobile
   */
  async findByMobile(mobile) {
    const { ctx } = this;
    const user = this.ctx.model.User.findOne({ mobile });
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return this.ctx.model.User.findOne({ mobile });
  }

  /**
   * 根据id查看用户个人信息
   * @param {*} _id
   */
  async findById(_id) {
    const { ctx } = this;
    const user = this.ctx.model.User.findById(_id);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    return this.ctx.model.User.findById(_id);
  }
}

module.exports = UserService;
