'use strict';
module.exports = (option, app) => {
  return async function verify(ctx, next) {
    const token = ctx.request.headers.authorization.replace('Bearer ', '');
    try {
      const ret = await app.jwt.verify(token, app.config.jwt.secret);
      console.log(` ==== ${ret.data.userId}`);
      // 根据userId查找是否存在此用户
      const user = await ctx.service.user.findByMobile(ret.data.userId);
      if (!user) {
        // eslint-disable-next-line no-return-assign
        return ctx.body = {
          code: -444,
          message: '不存在此用户',
        };
      }
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
      // eslint-disable-next-line no-return-assign
      return ctx.body = {
        code: -666,
        message: `token错误：${err}`,
      };
    }
  };
};
