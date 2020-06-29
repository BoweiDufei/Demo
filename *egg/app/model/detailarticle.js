'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const DetailArticleSchema = new mongoose.Schema({
    articleId: { type: Schema.Types.ObjectId, required: true }, // 文章id
    articleStr: { type: String }, // 内容
    authId: { type: Schema.Types.ObjectId }, // 作者
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model('Detailarticle', DetailArticleSchema, 'detailarticle');
};
