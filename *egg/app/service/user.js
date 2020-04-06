'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   */
  async createrUser(payload) {
    const { ctx } = this;
    return ctx.model.User.create(payload);
  }
}

module.exports = UserService;
