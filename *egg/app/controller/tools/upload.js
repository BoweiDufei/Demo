'use strict';

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const download = require('image-downloader');

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
    const writeStream = fs.createWriteStream(targetDict.uploadDir);
    // 文件处理，上传到云存储等等
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
    // 制作缩略图
    const litImg = await this.service.tool.jimpImg(targetDict.uploadDir);
    console.log('上传方法 成功 并且只做了缩略图');
    // 调用 Service 进行业务处理
    // 设置响应内容和响应状态码
    const url = targetDict.saveDir;
    // 存储数据库
    const pic = {
      title: filename,
      link: url,
      url,
      jimp01: litImg.img01,
      jimp02: litImg.img02,
    };
    const result = await this.ctx.model.Picture.create(pic);
    ctx.helper.success(ctx, result);
  }

  /**
   * @summary 下载单个文件
   * @description 下载单个文件到服务器
   * @router post /api/download/downloadImg
   * @request query downloadBaseRequest *query
   * @response 200 uploadBaseResponse 创建成功
   */
  async easydownloadImage() {
    const { ctx } = this;
    const url = ctx.request.body.url;
    const convstr = this.ctx.helper.md5(url);

    // 先从数据库中查找有没有这个图片，如果有，直接返回
    const locPic = await this.ctx.model.Picture.find({title: convstr});
    if(locPic.length>0){
      const firstObj = locPic[0];
      this.ctx.helper.success(ctx, {url: firstObj.url});
      return ;
    }

    const options = {
      url,
      dest: 'app/public/pic',
    };
    try {
      const { filename } = await download.image(options);
      // 重命名 

      const words = filename.split('/');
      words.pop()
      words.push(convstr+'.jpg');
      const othername = words.join('/');

      await this.ctx.helper.promisify(fs.rename)(filename,othername);

      const pic = {
        title: convstr,
        link: othername,
        url:othername,
        jimp01: othername,
        jimp02: othername,
      };
      // 存图片数据库
      const result = await this.ctx.model.Picture.create(pic);
      // 设置响应内容和响应状态码
      ctx.helper.success(ctx, {url: othername});
    } catch (error) {
      ctx.helper.fail(ctx,{})
    }
  }
}

module.exports = UploadController;
