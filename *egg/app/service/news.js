'use strict';

const Service = require('egg').Service;


const puppeteer = require('puppeteer');

class NewsService extends Service {
    // 百家号
    async startGetBaijiaNewsMethod(url) {
        
    (async () => {
        const browser = await (puppeteer.launch({
          // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
          //设置超时时间
          timeout: 15000,
          //如果是访问https页面 此属性会忽略https错误
          ignoreHTTPSErrors: true,
          // 打开开发者工具, 当此值为true时, headless总为false
          devtools: false,
          // 关闭headless模式, 不会打开浏览器
          headless: false
        }));
        const page = await browser.newPage();
        await page.goto(url);

        const result = await page.evaluate(async () => {
          const article = document.getElementById('article');
          var items = article.getElementsByClassName('feed-item');
          var links = [];
          if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
              const element = items[index];
              const firstObj = element.children[0];
              const mainElement = element.getElementsByClassName('s-right-img-texts')[0];
              const right = mainElement.getElementsByClassName('s-image-wrap')[0];
              const imgDiv = right.getElementsByClassName('s-image')[0];
              const titleDiv = mainElement.getElementsByClassName('text-title line-clamp-2')[0];
              
              // p
              var item = {};
              item.img = imgDiv.getAttribute('original');
              item.index = index+'';
              item.title = titleDiv.innerText;
              item.url = firstObj.getAttribute('url');
              links.push(item)
            }
          }
          return links;
        })

        console.log('fff = ', result)

        await browser.close();

      })();


    }
}

module.exports = NewsService;
