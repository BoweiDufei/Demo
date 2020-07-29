module.exports = app => {
  return async (ctx, next) => {
    if (true) {
      ctx.socket.disconnect();
      return;
    }
    await next();
    console.log('disconnection!');
  };
};