/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123123';

  // add your middleware config here
  config.middleware = ['errorHandler'];


  // 配置资源路径
  config.static = {
    prefix: '/public/', //靜態化URL  我這裏默認網站根目錄（項目需要）
    dir: path.join(appInfo.baseDir, 'mypublic'), // 靜態文件夾地址 可以設置多個 可以簡寫為 ：['app/public','app/public1']
    dynamic: true, //是否緩存靜態資源
    preload: false, //啓動項目開啓緩存
    // maxAge: 31536000,
    maxAge: 0, //緩存時間 開發建議設0 跳坑
    buffer: true, //是否緩存到内存 默認prod 緩存
  };

  config.uploadDir = path.join(config.static.dir, 'admin/upload');
  config.articlePicDir = path.join(config.static.dir, 'admin/artPic');

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {},
    enableSecurity: false,
    routerMap: true,
    enable: true,
  };

  config.jwt = {
    secret: 'Great-M',
    enable: true,
    match: /^\/auth/,
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
      // useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://127.0.0.1:3000'],
  };
  config.cors = {
    origin: '*', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  exports.bcrypt = {
    saltRounds: 10,
  };

  return {
    ...config,
    ...userConfig,
  };
};
