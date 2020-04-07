'use strict';

module.exports = {
  uploadBaseRequest: {
  },
  downloadBaseRequest: {
    url: { type: 'string', description: 'id 唯一键', required: true, example: 'http://www.baidu.com' },
  },
  uploadBaseResponse: { code: { type: 'string', required: true, example: 0 }, data: { type: 'string', example: '请求成功', errorMessage: { type: 'string', example: '请求成功' } } },
};
