'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 下载
 */
class DownController extends Controller {
  /**
   * @summary 下载
   * @description 下载
   * @router get /api/down
   * @response 200 uploadBaseResponse 创建成功
   */
  async easyDown() {
    const fs = require('fs');
    const filePath = 'app/public/1.html';
    const fileSize = (await this.ctx.helper.promisify(fs.stat)(filePath)).size.toString();
    this.ctx.attachment(filePath);
    this.ctx.set('Content-Length', fileSize);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(filePath);
  }
}

module.exports = DownController;
