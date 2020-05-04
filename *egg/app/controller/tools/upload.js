'use strict';

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const download = require('image-downloader');
const picJimp = require('jimp');

const Controller = require('egg').Controller;

/**
 * @Controller 上传
 */
class UploadController extends Controller {
  /**
   * @summary 上传单个文件
   * @description 上传单个文件
   * @router post /auth/upload/single
   * @request query uploadBaseRequest *query
   * @response 200 uploadBaseResponse 创建成功
   */
  async create() {
    const { ctx } = this;
    console.log('上传方法');
    // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件:
    // 只支持上传一个文件。
    // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
    const stream = await ctx.getFileStream();
    // 所有表单字段都能通过 `stream.fields` 获取到
    const filename = path.basename(stream.filename); // 文件名称
    // 获取的是个对象，有上传地址和数据库存储地址
    const targetDict = await this.service.tool.getUploadFile(filename);
    console.log(`获取到的地址为${targetDict.uploadDir}`);
    const writeStream = fs.createWriteStream(targetDict.uploadDir);
    // 文件处理，上传到云存储等等
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

    // 生成缩略图
    picJimp.read(targetDict.uploadDir, (err, lenna) => {
      console.log(err);
      if (err) throw err;
      lenna
        .resize(200, 200) // resize
        .quality(60) // set JPEG quality
        .write(`${targetDict.uploadDir + '_200*200' + targetDict.fileExt}`); // save
    });

    // 调用 Service 进行业务处理
    // 设置响应内容和响应状态码
    const url = targetDict.saveDir;
    console.log(`url = ${url}`);
    // 存储数据库
    const pic = {
      title: filename,
      link: url,
      url,
    };
    const result = await this.ctx.model.Picture.create(pic);
    console.log(result);
    ctx.helper.success(ctx);
  }

  /**
   * @summary 下载单个文件
   * @description 下载单个文件到服务器
   * @router post /auth/download/downloadImg
   * @request query downloadBaseRequest *query
   * @response 200 uploadBaseResponse 创建成功
   */
  async download() {
    const { ctx } = this;
    const url = ctx.query.url;
    const options = {
      url,
      dest: 'app/public/uploads',
    };
    const { filename } = await download.image(options);
    console.log(filename); // => /path/to/dest/image.jpg
    // 调用 Service 进行业务处理
    // 设置响应内容和响应状态码
    ctx.helper.success(ctx);
  }
}

module.exports = UploadController;
