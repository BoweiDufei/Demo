'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.admin.home.index);
  app.io.route('chat', app.io.controller.chat.index);
  app.io.route('chatToSomeOne', app.io.controller.chat.chatToSomeOne);
  app.io.route('chatInRoom', app.io.controller.chat.chatInRoom); // 房间群聊
  app.io.route('login', app.io.controller.login.index); // 登录
  
};
