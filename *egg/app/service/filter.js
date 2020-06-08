'use strict';

const Service = require('egg').Service;
class FilterService extends Service {
  /**
   * 协同过滤算法 ratings 多维数组，  target为某一个元素
   */
  async startFilterMethod(ratings, target) {
    const recommend = require('collaborative-filter');
    const result = recommend.cFilter(ratings, target);
    return result;
  }
}
module.exports = FilterService;
