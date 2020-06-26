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
  setPcPromise(url) {
    const request = require('request');
    return new Promise((resolve, reject) => {
      request(url, (error, _, body) => {
        if (error) {
          reject(error);
        } else {
          const cheerio = require('cheerio');
          const $ = cheerio.load(body);
          const target = [];

          $('*').each(function(i, ele) {
            if ($(ele).is('p')) {
              const txt = $(ele).text();
              const richTxt = `<p style="text-indent:2em; line-height:22px; font-size:16px;">${txt}</p>`
              target.push(richTxt);
            }
          });
          const w = target.join('<br>');
          resolve(w);
        }
      });
    });
  }
  // 爬虫设置
  setPcPromise2(url) {
    const http = require('http');
    const iconv = require('iconv-lite');
    const xpath = require('xpath');
    const dom = require('xmldom').DOMParser;

    return new Promise((resolve, reject) => {
      http.get(url, function(res) {
        const htmlData = []; // 用于接收获取到的网页
        // eslint-disable-next-line no-unused-vars
        let htmlDataLength = 0;

        res.on('data', function(chunk) {
          htmlData.push(chunk);
          htmlDataLength += chunk.length;
        });
        res.on('end', function() {
          // 数据获取完毕后，开始解码
          const bufferHtmlData = Buffer.concat(htmlData, htmlDataLength);
          const decodeHtmlData = iconv.decode(bufferHtmlData, 'gbk');
          const xml = decodeHtmlData;
          const doc = new dom().parseFromString(xml);
          const nodes = xpath.select("//*[@id='js_content']/section", doc);
          const w = nodes.toString();
          console.log(w);
          resolve(w);
        });
        res.on('error', function(err) {
          if (err != null) {
            reject(err);
          }
        });

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
