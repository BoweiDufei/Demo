'use strict';

const sd = require('silly-datetime');
const path = require('path');
const fs = require('fs');

module.exports = {
  schedule: {
    cron: '0 0 */1 * * *', // 每一点删除一次
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const day_30 = new Date().setMonth((new Date().getMonth() - 1)); // 日期是30天前的对应时间戳
    // day_30 = new Date(day_30);
    const day = sd.format(day_30, 'YYYYMMDD');
    // 2、创建图片保存的路径
    const dayStr = day + '';
    console.log('删除三十天前：', dayStr);
    const configPath = ctx.app.config.articlePicDir;
    if (fs.existsSync(configPath)) {
      const files = fs.readdirSync(configPath);
      files.forEach((file, index) => {
        if (file < dayStr) {
          // 小于三十天前的图片，统统删除
          const deletepath = path.join(configPath, file);
          ctx.helper.deleteDir(deletepath);
        }
      });
    }
    // const dir = path.join(this.config.uploadDir, dayStr);
    // console.log('执行递归删除方法');
  },

};
