const express = require('express');
// const fs = require('fs');
// var request = require('request');
const puppeteer = require('puppeteer');
const e = require('express');
let app = express();

app.get('/filedown', async (req, res, next) => {

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
        await page.goto('http://localhost:8080');

        const result = await page.evaluate(async () => {
          var items = document.getElementsByClassName('aaa');
          var links = [];
          if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
              const element = items[index];
              // p
              const p = element.getElementsByTagName('p')[0];
              const a = element.getElementsByTagName('a')[0];
              const img = element.getElementsByTagName('img')[0];;
              var item = {};
              item.p = p.innerText;
              item.href = a.href;
              item.img = img.src;

              links.push(item)
            }
          }
          return links;
        })
        console.log('fff = ', result)

        await browser.close();

      })();


    res.end('测试');
})

app.listen(3001, () => {
    console.log(`server is running at port 3000`)
})