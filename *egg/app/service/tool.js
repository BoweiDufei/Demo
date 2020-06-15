'use strict';

const Service = require('egg').Service;
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const jimp = require('jimp');

class ToolService extends Service {
  /**
   * 获取验证码
   */
  async getVerCode() {
    const svgCaptcha = require('svg-captcha');
    const captcha = svgCaptcha.create();
    return captcha;
  }
  /**
   * md5 加密
   */
  async dbwMd5(content) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(content).digest('hex');
  }

  /**
   * 获取当前时间
   */
  async getTime() {
    const d = new Date();
    return d.getTime();
  }
  /**
   * 获取路径
   */
  async getUploadFile(fileName) {
    // 1、获取当前日期     20180920
    const day = sd.format(new Date(), 'YYYYMMDD');
    // 2、创建图片保存的路径
    const dayStr = day + '';
    const dir = path.join(this.config.uploadDir, dayStr);
    await mkdirp(dir);
    const d = await this.getTime();
    const uuid = (Math.random() * 999999).toFixed();
    const tmpstr = '' + uuid + d + fileName;
    const fileExt = path.extname(fileName);
    const resultStr = await this.dbwMd5(tmpstr);
    const uploadDir = path.join(dir, resultStr) + fileExt;
    return {
      uploadDir,
      saveDir: this.dealUploadPath(uploadDir),
      fileExt,
    };
  }

  /** 处理图片路径 */
  dealUploadPath(path) {
    return path.slice(3).replace(/\\/g, '/');
  }

  // 爬虫设置
  setPcPromise(url){
    const request = require('request')
    return new Promise((resolve, reject)=>{
      request(url, (error, _, body)=>{
        if (error) {
          reject(error)
        } else {
          const cheerio = require('cheerio')
          const $ = cheerio.load(body)
          const a = $('p').html()
          resolve(a)
        }
      });
    });
  }

  /**
   * 制作缩略图
  */
  async jimpImg(filePath) {
    // 生成缩略图
    const lenna = await jimp.read(filePath);
    console.log(`lenna.bitmap.width = ${lenna.bitmap.width} and lenna.bitmap.height = ${lenna.bitmap.height}`);
    const scale = lenna.bitmap.height * 1.0 / lenna.bitmap.width;
    const imgWidth1 = 200;
    const imgHeight1 = imgWidth1 * scale;
    const img01 = filePath + '_200' + path.extname(filePath);
    const img02 = filePath + '_400' + path.extname(filePath);
    lenna
      .resize(imgWidth1, imgHeight1) // resize
      .quality(60) // set JPEG quality
      .write(img01); // save

    const imgWidth2 = 400;
    const imgHeight2 = imgWidth2 * scale;
    lenna
      .resize(imgWidth2, imgHeight2) // resize
      .quality(60) // set JPEG quality
      .write(img02); // save
    return { img01: this.dealUploadPath(img01), img02: this.dealUploadPath(img02) };
  }

}

module.exports = ToolService;
