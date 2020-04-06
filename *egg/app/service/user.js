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
    payload.password = await this.ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }
}

module.exports = UserService;
