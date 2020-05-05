'use strict';

const Service = require('egg').Service;

class CacheService extends Service {
  // 设置存储键值对
  async set(key, value, seconds) {
    if (!this.app.redis) {
      return;
    }
    value = JSON.stringify(value);
    if (seconds) {
      // 设置过期时间
      await this.app.redis.set(key, value, 'EX', seconds);
    } else {
      await this.app.redis.set(key, value);
    }
  }

  // 获取数据方法
  async get(key) {
    if (!this.app.redis) {
      return;
    }
    const value = await this.app.redis.get(key);
    if (!value) {
      return;
    }
    return JSON.parse(value);
  }
}

module.exports = CacheService;
