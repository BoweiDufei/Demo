'use strict';
// 分数表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    sno: { type: String }, // 学生编号
    cno: { type: String }, // 课程编号
    degree: { type: Number },
  });
  return mongoose.model('Score', OrderSchema, 'score');
};
