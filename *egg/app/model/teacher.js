'use strict';
// 教师表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    tno: { type: String, unique: true, required: true }, // 教师编号
    tname: { type: String },
    tsex: { type: String },
    prof: { type: String }, // 职称
    depart: { type: String }, // 部门
    tbirthday: { type: String },
  });
  return mongoose.model('Teacher', OrderSchema, 'teacher');
};
