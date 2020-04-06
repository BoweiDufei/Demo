'use strict';

module.exports = {
  createUserRequest: {
    mobile: { type: 'string', description: 'id 唯一键', required: true, example: '13050584789' },
    password: { type: 'string', description: 'id 唯一键', required: true, example: '123123' },
    realName: { type: 'string', description: 'id 唯一键', required: true, example: '123123' },
  },
  loginUserRequest: {
    mobile: { type: 'string', description: 'id 唯一键', required: true, example: '13050584789' },
    password: { type: 'string', description: 'id 唯一键', required: true, example: '123123' },
  },
  updateUserByIdRequest: {
    id: { type: 'string', description: 'id 唯一键', required: true, example: '123123123124123' },
  },
  deleteUserByIdRequest: {
    id: { type: 'string', description: 'id 唯一键', required: true, example: '123123123124123' },
  },
  deleteUserByMobileRequest: {
    mobile: { type: 'string', description: 'id 唯一键', required: true, example: '123123123124123' },
  },
};
