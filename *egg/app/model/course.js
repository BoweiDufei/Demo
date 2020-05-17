'use strict';
// 课程表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    cno: { type: String }, // 课程号
    cname: { type: String }, // 课程名字
    tno: { type: String }, // 教师编号
  });
  return mongoose.model('Course', OrderSchema, 'course');
};
