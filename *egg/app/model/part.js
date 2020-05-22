'use strict';
// 供应商方法
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SenderSchema = new Schema({
    pno: { type: String }, // 学生编号
    pname: { type: String }, // 课程编号
    color: { type: String },
    weight: { type: String },
  });
  return mongoose.model('Part', SenderSchema, 'part');
};
