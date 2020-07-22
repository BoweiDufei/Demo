'use strict';
module.exports = {
  schedule: {
    interval: '6h', // 时间可以调长一点
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const time = new Date();
    const hour = time.getHours();
    if (hour < 4 || hour > 23) {
      return;
    }
    // 全方位武器
    // const address = 'https://rs.mbd.baidu.com/r/5ZMEhEF1Vm?f=cp&u=f30d4afb26d432b3';
    // await ctx.service.news.startGetBaijiaNewsMethod(address);

  },
};
