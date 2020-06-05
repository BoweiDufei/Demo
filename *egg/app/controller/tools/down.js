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

      // eslint-disable-next-line no-unused-vars
      // let statObj = {};
      // try {
      //   statObj = fs.statSync(filePath);
      // } catch (e) {
      //   this.ctx.body = '错误';
      //   return;
      // }
      const total = (await this.ctx.helper.promisify(fs.stat)(filePath)).size;
      // const total = statObj.size;
      console.log(`totlal ==== ${total}`);
      // 处理请求头中范围参数不传的问题
      start = start ? parseInt(start) : 0;
      end = end ? parseInt(end) : total - 1;
      this.ctx.statusCode = 206;
      this.ctx.set('Accept-Ranges', 'bytes');
      this.ctx.set('Content-Range', `bytes ${start}-${end}/${total}`);
      console.log(`fileSize3 = ${total} start3=${start} end3=${end}`);
      this.ctx.body = fs.createReadStream(filePath, { start, end });
    } else {
      this.ctx.body = fs.createReadStream(filePath);
    }
  }
}

module.exports = DownController;
