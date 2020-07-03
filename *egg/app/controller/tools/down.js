'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 下载
 */
class DownController extends Controller {
  /**
   * @summary 下载
   * @description nodejs版本大文件之断点下载 https://www.chrunlee.cn/article/nodejs-file-range-download.html
   * @router get /api/down
   * @response 200 uploadBaseResponse 创建成功
   */
  async easyDown() {
    const fs = require('fs');
    const filePath = 'app/public/2.html';
    // const fileSize = (await this.ctx.helper.promisify(fs.stat)(filePath)).size;
    this.ctx.body = fs.createReadStream(filePath);
  }

  /**
   * @summary 下载
   * @description nodejs版本大文件之断点下载 https://www.chrunlee.cn/article/nodejs-file-range-download.html
   * @router get /api/superdown/:file
   * @response 200 uploadBaseResponse 创建成功
   */
  async superDown() {
    const fs = require('fs');
    const filePath = 'app/public/' + this.ctx.params.file;
    const range = this.ctx.request.headers.range;
    console.log(`range = ${range}`);
    if (range) {
      let [ , start, end ] = range.match(/(\d*)-(\d*)/);
      const total = (await this.ctx.helper.promisify(fs.stat)(filePath)).size;
      // 处理请求头中范围参数不传的问题
      start = start ? parseInt(start) : 0;
      end = end ? parseInt(end) : total - 1;
      this.ctx.statusCode = 206;
      this.ctx.set('Accept-Ranges', 'bytes');
      this.ctx.set('Content-Range', `bytes ${start}-${end}/${total}`);
      this.ctx.body = fs.createReadStream(filePath, { start, end });
    } else {
      this.ctx.body = fs.createReadStream(filePath);
    }
  }
}

module.exports = DownController;
