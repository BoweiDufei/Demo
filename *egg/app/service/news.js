'use strict';

const Service = require('egg').Service;


const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const path = require('path');

class NewsService extends Service {
  // 百家号
  async startGetBaijiaNewsMethod(url) {

    (async () => {
      const browser = await (puppeteer.launch({
        // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
        // 设置超时时间
        timeout: 15000,
        // 如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
        // 关闭headless模式, 不会打开浏览器
        headless: true,
      }));
      const page = await browser.newPage();
      await page.goto(url);

      const contentList = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        const article = document.getElementById('article');
        const items = article.getElementsByClassName('feed-item');
        const links = [];
        if (items.length > 0) {
          for (let index = 0; index < items.length; index++) {
            const element = items[index];
            const firstObj = element.children[0];
            const mainElement = element.getElementsByClassName('s-card-body')[0];
            const right = mainElement.getElementsByClassName('s-image-wrap')[0];
            const imgDiv = right.getElementsByClassName('s-image')[0];
            const titleDiv = mainElement.getElementsByClassName('text-title line-clamp-2')[0];
            const commentDiv = mainElement.getElementsByClassName('s-subscripts sfi-article-subscript tab-subscript')[0];
            const commentSpan = commentDiv.getElementsByTagName('span')[1];

            // p
            const item = {};
            item.img = imgDiv.getAttribute('original');
            item.index = index + '';
            item.title = titleDiv.innerText;
            item.url = firstObj.getAttribute('url');
            item.comment = commentSpan.innerText.replace('评论', '');
            links.push(item);
          }
        }
        return links;
      });

      for (let index = 0; index < contentList.length; index++) {
        const item = contentList[index];
        const titleStr = item.title;
        const comment = item.comment;
        const num = parseInt(comment);
        if (num === 0) {
          console.log('评论数量为0');
          continue;
        }
        // 先查询一下，数据库中有没有此文章，有的话就不要爬了
        const locRes = await this.ctx.model.Sumarticle.find({ titleStr }) || [];
        if (locRes.length > 0) {
          continue;
        }
        const model = { href: item.url, titleStr, contentStr: '', imgSrc: item.img, type: '1' };
        const result = await this.ctx.model.Sumarticle.create(model);
        // 获取文章内容
        const detailResult = await this.getBaiduDetailArticleMethond(item.url, result._id);
        if (!detailResult) {
          continue;
        }
      }

      await browser.close();

    })();


  }

  async getBaiduDetailArticleMethond(url, articleId) {
    (async () => {
      const browser = await (puppeteer.launch({
        // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
        // 设置超时时间
        timeout: 15000,
        // 如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
        // 关闭headless模式, 不会打开浏览器
        headless: true,
      }));
      const page = await browser.newPage();
      await page.goto(url);

      let articleStr = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        const article = document.getElementById('article');
        const content = article.getElementsByClassName('article-content')[0];
        return content.outerHTML;
      });

      // 剔除特殊符号
      articleStr = articleStr.replace(new RegExp('&lt;', 'g'), '<');
      articleStr = articleStr.replace(new RegExp('&gt;', 'g'), '>');
      articleStr = articleStr.replace(new RegExp('&amp;', 'g'), '&');

      //
      const $ = cheerio.load(articleStr);
      const imglist = [];
      $('img').each(function(i, elem) {
        imglist.push($(this).attr('src'));
      });
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
          articleStr = articleStr.replace(imgStr, resultImg);
        }
      }

      const item = { articleId, articleStr };
      await this.ctx.model.Detailarticle.create(item);
      await browser.close();
      return true;
    })();
  }

}

module.exports = NewsService;
