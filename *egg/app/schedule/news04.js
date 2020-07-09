'use strict';
module.exports = {
  schedule: {
    cron: '0 0 */2 * * *', // 每2
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // 新华社媒体
    const address = 'https://mi.mbd.baidu.com/r/4jN4gd4bQc?f=cp&u=1a3749def54ca2cd';
    await ctx.service.news.startGetBaijiaNewsMethod(address);

  },
};
