/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.uploadDir = 'app/public/admin/upload';
  config.articlePicDir = 'app/public/admin/artPic';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
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
    domainWhiteList: [ 'http://127.0.0.1:3000' ],
  };
  config.cors = {
    origin: '*', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
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
