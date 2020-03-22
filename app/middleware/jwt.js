'use strict';
module.exports = (option, app) => {
  return async function verify(ctx, next) {
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    try {
      const ret = await app.jwt.verify(token, app.config.jwt.secret);
      console.log(` ==== ${ret.data.userId}`);
      ctx.state.userId = ret.data.userId;
      await next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        ctx.state.email = '';
        // eslint-disable-next-line no-return-assign
        return ctx.body = {
          code: -666,
          message: '登录过期',
        };
      }
      console.log('错误', 'token过期');
    }
  };
};
