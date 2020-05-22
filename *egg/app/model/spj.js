'use strict';
// 供应商方法
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SenderSchema = new Schema({
    sno: { type: String }, // 课程编号
    pno: { type: String },
    jno: { type: String },
    qty: { type: Number },
  });
  return mongoose.model('Spj', SenderSchema, 'spj');
};
