'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const download = require('image-downloader');

class DownService extends Service {

  /**
   * 下载图片到本地电脑
   */
  async downImageWithUrl(url) {
    const convstr = this.ctx.helper.md5(url);
    // 先从数据库中查找有没有这个图片，如果有，直接返回
    const locPic = await this.ctx.model.Picture.find({title: convstr});
    if(locPic.length>0){
      const firstObj = locPic[0];
      return firstObj.url;
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

      // 修改名字
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
      return othername;
    } catch (error) {
      return '';
    }
  }
}

module.exports = DownService;
