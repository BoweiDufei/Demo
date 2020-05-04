'use strict';

const Service = require('egg').Service;
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');

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
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
      fileExt,
    };
  }
}

module.exports = ToolService;
