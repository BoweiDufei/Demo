'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
  async apply(_userId) {
    const { ctx } = this;
    const token = ctx.app.jwt.sign({
      data: {
        userId: _userId,
      }, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secret);
    return `Bearer ${token}`;
  }
}

module.exports = ActionTokenService;
