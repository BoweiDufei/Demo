'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.admin.home.index);
  app.io.route('chat', app.io.controller.default.index);
};
