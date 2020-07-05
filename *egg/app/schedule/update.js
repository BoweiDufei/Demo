'use strict';
module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const rootNums = [ '2', '51', '19', '414', '25', '3', '20', '22', '23', '26', '27', '21', '70', '80', '1', '18', '261' ];
    // const rootNums = [ '2' ];
    // for (let index = 0; index < rootNums.length; index++) {
    //   const eleStr = rootNums[index];
    //   const address = `http://web.anyv.net/index.php/categoryyuedu-${eleStr}-page-1`;
    //   await ctx.service.tool.setPcPromise2(address);
    // }
  },
};
