'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    realName: { type: String, required: true },
    avatar: {
      type: String, default: 'https://www.baidu.com',
    },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    children: { type: Array, default: [] },
  },
  {
    strict: false,
  });
  return mongoose.model('User', UserSchema, 'user');
};
