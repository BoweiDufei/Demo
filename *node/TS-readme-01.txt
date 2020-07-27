安装TS
npm install -g typescript
判断是否安装成功， 一定要先关闭终端再运行 tsc -v
运行 tsc aaa.ts  编译成es5
配置开发工具vs实现自动编译ts文件为js
tsc --init // 生成tsconfig.json配置文件
1，在.json文件中 "outDir": "./js", 打开
2，终端 - 运行任务 - 点击typescript - 选择tsc 监视


