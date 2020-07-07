'use strict';
module.exports = (option, app) => {
  return async function verify(ctx, next) {
    try {
      if (ctx.request.headers.authorization === undefined) {
        ctx.helper.fail(ctx, 'token无效');
        return;
      }
      const token = ctx.request.headers.authorization.replace('Bearer ', '');
      const ret = await app.jwt.verify(token, app.config.jwt.secret);
      // 根据userId查找是否存在此用户
      const user = await ctx.service.user.findByMobile(ret.data.userId);
      if (!user) {
        // eslint-disable-next-line no-return-assign
        return ctx.body = {
          code: -444,
          message: '不存在此用户',
        };
      }
      ctx.currentUser = user; // 以后可以直接使用这个获取当前用户
      ctx.userId = ctx.currentUser.mobile;
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
