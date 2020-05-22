'use strict';
// 供应商方法
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SenderSchema = new Schema({
    jno: { type: String }, // 课程编号
    jname: { type: String },
    city: { type: String },
  });
  return mongoose.model('Ject', SenderSchema, 'ject');
};
