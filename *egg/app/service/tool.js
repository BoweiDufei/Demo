'use strict';

const Service = require('egg').Service;
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const jimp = require('jimp');
const http = require('http');
const iconv = require('iconv-lite');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const cheerio = require('cheerio');

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
   * 获取路径 不用进行加工处理 filename = 10928908590123.jpg
   */
  async easyGetPicPathWithoutRepeat(fileName) {
    // 1、获取当前日期     20180920
    const day = sd.format(new Date(), 'YYYYMMDD');
    // 2、创建图片保存的路径
    const dayStr = day + '';
    const dir = path.join(this.config.articlePicDir, dayStr);
    await mkdirp(dir);
    const uploadDir = path.join(dir, fileName);
    return {
      uploadDir,
      saveDir: this.dealUploadPath(uploadDir),
    };
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
  async setPcPromise2(url) {
    const nodes = await this.getPcBasicContent(url, "//div[@class='image group']");
    try {
      for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index];
        const elementStr = element.toString();
        const $ = cheerio.load(elementStr);

        const titleStr = $('.news_desc h3 a').text(); // 标题

        // 先查询一下，数据库中有没有此文章，有的话就不要爬了
        const locRes = await this.ctx.model.Sumarticle.find({ titleStr }) || [];
        if (locRes.length > 0) {
          continue;
        }

        const href = $('.group a').attr('href'); // 跳转路由
        const contentStr = $('.news_desc p a').text(); // 简介
        const imgSrc = $('.grid a img').attr('src'); // 图片

        // 图片要下载下来 不然不能用
        const convstr = this.ctx.helper.md5(imgSrc); // md5图

        const convfilename = convstr + '.jpg';
        const fileResult = await this.service.tool.easyGetPicPathWithoutRepeat(convfilename);
        const othername = path.join('app', fileResult.saveDir);
        const flag = await this.ctx.helper.easyDownImage(imgSrc, othername);
        if (flag) {
          url = othername;
        } else {
          url = '';
        }
        const resultImg = url.length > 0?'http://127.0.0.1:8899/' + url:imgSrc;
        const item = { href, titleStr, contentStr, imgSrc: resultImg };
        const result = await this.ctx.model.Sumarticle.create(item);

        // 获取文章内容
        const detailResult = await this.getDetailArticleMethond(href, result._id, '//*[@id="js_content"]');
        if (!detailResult) {
          continue;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      console.log('url = ', url);
      return false;
    }
  }

  async getDetailArticleMethond(url, articleId, xpathPath) {
    try {
      const nodes = await this.getPcBasicContent(url, xpathPath);

      // 文章中的图片也要下载
      let articleStr = nodes.toString();
      // 去除特殊符号
      articleStr = articleStr.replace(new RegExp('&lt;', 'g'), '<');
      articleStr = articleStr.replace(new RegExp('&gt;', 'g'), '>');
      articleStr = articleStr.replace(new RegExp('&amp;', 'g'), '&');
      const $ = cheerio.load(articleStr);
      const imglist = [];
      $('img').each(function(i, elem) {
        const dataSrc = $(this).attr('data-src');
        if (dataSrc.length > 0) {
          imglist.push(dataSrc);
        }
        const src = $(this).attr('data-src');
        if (src.length > 0) {
          imglist.push(src);
        }
      });
      // 开始遍历 图片并下载
      for (let index = 0; index < imglist.length; index++) {
        const imgStr = imglist[index];
        const convstr = this.ctx.helper.md5(imgStr); // md5图

        // 先从数据库中搜索
        let url = '';
        const locPic = await this.ctx.model.Picture.find({ title: convstr });
        if (locPic.length > 0) {
          // 数据库中有
          const firstObj = locPic[0];
          url = firstObj.url;
        } else {
          // 数据库中没有就下载
          // 开始下载
          const convfilename = convstr + '.jpg';
          const fileResult = await this.service.tool.easyGetPicPathWithoutRepeat(convfilename);
          const othername = path.join('app', fileResult.saveDir);
          const flag = await this.ctx.helper.easyDownImage(imgStr, othername);
          if (flag) {
            url = othername;
            const pic = {
              title: convstr,
              link: othername,
              url: othername,
              jimp01: othername,
              jimp02: othername,
            };
            // 存图片数据库
            await this.ctx.model.Picture.create(pic);
          } else {
            url = '';
          }
        }
        const resultImg = url.length > 0 ? 'http://127.0.0.1:8899/' + url : imgStr;
        if (url.length > 0) {
          articleStr = articleStr.replace(new RegExp(imgStr,'g'),resultImg);
        }
      }
      if (imglist.length === 0) {
        console.log('imglist.length==0 url = ',url);
      }
      // 开始存储到详情
      const item = { articleId, articleStr };
      await this.ctx.model.Detailarticle.create(item);
      return true;
    } catch (error) {
      console.log('捕捉到了错误 = ',error);
      return false;
    }
  }

  // 根据url和xpath路径 获取到内容字符串
  getPcBasicContent(url, xpathPath) {

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
          const nodes = xpath.select(xpathPath, doc);
          resolve(nodes);
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
