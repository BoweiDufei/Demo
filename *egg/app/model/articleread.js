'use strict';
// 供应商方法
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ArticleReadSchema = new Schema({
    userId: { type: String }, // 用户名字
    articleId: { type: String }, // 文章id
    createdAt: { type: Date, default: Date.now }, // 阅读的时间
  });
  return mongoose.model('Articleread', ArticleReadSchema, 'articleread');
};
