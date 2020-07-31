https://blog.csdn.net/weixin_42490398/article/details/90212418

Egg-实战
https://eggjs.org/zh-cn/

1，创建项目
#创建项目
cnpm i egg-init -g
egg-init myserver --type=simple
cd myserver
cnpm i
#启动项目
cnpm run dev
open http://127.0.0.1:7001

2，添加依赖

npm i egg-swagger-doc-feat egg-validate egg-mongoose egg-bcrypt egg-jwt apn crypto await-stream-ready stream-wormhole image-downloader svg-captcha silly-datetime mz-modules jimp egg-redis egg-cors collaborative-filter juice cheerio iconv-lite xmldom xpath egg-scripts puppeteer egg-socket.io qr-image node-uuid -s

3, 数据库的配置，一定要先mongod --dbpath ***/***

4，可视化mongodb
mongo-express的设置：https://www.jianshu.com/p/b6ea35eb4762
前往路径：/Users/dbw/node_modules/mongo-express
或者：/usr/local/lib/node_modules/mongo-express


5，python相关资料
尚鸿元：
https://github.com/jackfrued/Python-100-Days
https://www.runoob.com/python3/python3-intro.html

#####
6，egg.js相关知乎：https://www.zhihu.com/topic/20073492/hot

7，NUXT + eggjs 实现SSR技术 (重要)
https://github.com/doubi-NO1/egg-nuxt-demo

8，协同过滤推荐算法 https://github.com/TSonono/collaborative-filtering#readme

9，eggjs 部署
egg-scripts start --port=7001 --daemon --title=egg-server-showcase

npm start
npm stop



