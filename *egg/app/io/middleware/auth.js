module.exports = app => {
  return async (ctx, next) => {
    const time = await ctx.helper.formateTime()
    const item = {};
    item.time = time;
    item.id = ctx.socket.id;
    ctx.socket.emit('socketid', JSON.stringify(item));
    await next;
    console.log('disconnection!');
  };
};