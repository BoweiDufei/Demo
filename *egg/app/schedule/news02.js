'use strict';
module.exports = {
  schedule: {
    interval: '90m',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const time = new Date();
    const hour = time.getHours();
    if (hour < 4 || hour > 23) {
      return;
    }
    // 渔网捕鱼
    const address = 'https://ra.mbd.baidu.com/r/5ZHxh87IXu?f=cp&u=a7fde4e459a9a2dc';
    await ctx.service.news.startGetBaijiaNewsMethod(address);

  },
};
