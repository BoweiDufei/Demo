'use strict';

const Service = require('egg').Service;

class FirstService extends Service {
  async method(payload) {
    console.log(payload);
  }
}

module.exports = FirstService;
