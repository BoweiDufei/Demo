'use strict';
// 供应商方法
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ArticleSchema = new Schema({
    userId: { type: String, required: true }, //  用户名字
    title: { type: String, required: true }, // 标题
    desc: { type: String, required: true }, // 描述
    content: { type: String, required: true }, // 内容
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model('Article', ArticleSchema, 'article');
};
