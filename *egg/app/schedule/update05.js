'use strict';
module.exports = {
  schedule: {
    cron: '0 0 */6 * * *',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const rootNums = [ '70', '80', '1', '18', '261' ];
    for (let index = 0; index < rootNums.length; index++) {
      const eleStr = rootNums[index];
      const address = `http://web.anyv.net/index.php/categoryyuedu-${eleStr}-page-1`;
      await ctx.service.tool.setPcPromise2(address);
    }
  },
};
