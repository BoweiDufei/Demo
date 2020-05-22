'use strict';
// 供应商方法
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SenderSchema = new Schema({
    sno: { type: String }, // 学生编号
    sname: { type: String }, // 课程编号
    status: { type: Number },
    city: { type: String },
  });
  return mongoose.model('Sender', SenderSchema, 'sender');
};
