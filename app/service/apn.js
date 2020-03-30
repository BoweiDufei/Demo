'use strict';

const Service = require('egg').Service;

class ApnService extends Service {
  /**
   * @param {token数组} tokens
   * @param {参数} params
   */
  async sendAPNS(tokens, params) {
    if (tokens.length === 0) return;
    const apn = require('apn');
    const productFlag = params.productFlag;// 是否是外网，默认是内网
    let providerItem = {};
    if (productFlag === '1') {
      // 外网
      providerItem = {
        cert: 'app/public/product_apns-dev-cert2.pem',
        key: 'app/public/product_apns-dev-key2.pem',
        // gateway: "gateway.sandbox.push.apple.com",
        gateway: 'gateway.push.apple.com',
        passphrase: '000000',
        production: true,
      };
    } else {
      // 内网
      providerItem = {
        cert: 'app/public/development_apns-dev-cert2.pem',
        key: 'app/public/development_apns-dev-key2.pem',
        gateway: 'gateway.sandbox.push.apple.com',
        // gateway: 'gateway.push.apple.com',
        passphrase: '000000',
        production: false,
      };
    }
    const service = new apn.Provider(providerItem);
    const note = new apn.Notification({
      alert: params.note,
    });
    // 主题 一般取应用标识符（bundle identifier）
    note.topic = params.topic;
    try {
      const result = await service.send(note, tokens);
      console.log(`发送成功:${result.sent.length}，发送失败:${result.failed.length}`);
      service.shutdown();
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ApnService;
