'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const PictureSchema = new mongoose.Schema({
    title: { type: String },
    link: { type: String },
    desc: { type: String },
    url: { type: String },
    safe: { type: String },
    authId: { type: String },
    arg: { type: String },
    jimp01: { type: String }, // 缩略图200
    jimp02: { type: String }, // 缩略图400
    createdAt: { type: Date, default: Date.now },
  },
  {
    strict: false,
  });
  return mongoose.model('Picture', PictureSchema, 'picture');
};
