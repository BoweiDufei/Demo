'use strict';
module.exports = {
  schedule: {
    interval: '60m',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const address = 'http://web.anyv.net/index.php/action-yuedu-page-0';
    await ctx.service.tool.setPcPromise2(address);
  },
};
