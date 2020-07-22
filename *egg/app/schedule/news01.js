'use strict';
module.exports = {
  schedule: {
    interval: '30m',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const time = new Date();
    const hour = time.getHours();
    if (hour < 4 || hour > 23) {
      return;
    }
    // 央视网新闻
    // const address = 'http://webpage.mbd.baidu.com/home?context={%22app_id%22:%221573407181922932%22}';
    // await ctx.service.news.startGetBaijiaNewsMethod(address);

  },
};
