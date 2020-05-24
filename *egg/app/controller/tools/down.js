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

    // const range = this.ctx.request.headers.range;
    // const [ start, end ] = range.match(/(\d*)-(\d*)/);
    // console.log(start, end);
    // const fs = require('fs');
    // const filePath = 'app/public/2.html';
    // const fileSize = (await this.ctx.helper.promisify(fs.stat)(filePath)).size;
    // this.ctx.attachment(filePath);
    // this.ctx.set('Content-Length', fileSize);
    // // this.ctx.set('Content-Type', 'application/octet-stream');
    // const _start = start ? parseInt(start) : 0;
    // const _end = end ? parseInt(end) : fileSize - 1;
    // this.ctx.res.setHeader('Accept-Ranges', 'bytes');
    // this.ctx.res.setHeader('Content-Range', `bytes ${_start}-${_end}/${fileSize}`);
    // console.log('begin=======2');
    // this.ctx.body = fs.createReadStream(filePath, _start, _end);
  }
}

module.exports = DownController;
