https://blog.csdn.net/weixin_42490398/article/details/90212418

git remote add BoweiDufei https://github.com/BoweiDufei/Demo
git remote add Demo https://github.com/BoweiDufei/Demo
git remote -v
git pull Demo master

git add .
git commit -m "add"
git push Demo master

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

npm i egg-swagger-doc-feat egg-validate egg-mongoose egg-bcrypt egg-jwt apn -s

