'use strict';
// 学生表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    sno: { type: String, unique: true, required: true }, // 学号
    sname: { type: String },
    ssex: { type: String },
    class: { type: String }, // 学生所在班级
    sbirthday: { type: String }, // 出生时间
  });
  return mongoose.model('Student', OrderSchema, 'student');
};
