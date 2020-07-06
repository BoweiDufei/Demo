'use strict';
// 供应商方法
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SumarticleSchema = new Schema({
    href: { type: String }, //  连接
    titleStr: { type: String }, // 标题
    contentStr: { type: String }, // 描述
    imgSrc: { type: String }, // 图片
    createdAt: { type: Date, default: Date.now }, // 创建时间
  });
  return mongoose.model('Sumarticle', SumarticleSchema, 'sumarticle');
};
