'use strict';
// 图片轮播图
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CarouselSchema = new Schema({
    userId: { type: String }, // 用户id
    title: { type: String }, // 标题
    desc: { type: String }, // 描述
    pic: { type: String, required: true }, // 图片
    linker: { type: String }, // 连接地址
    jump: { type: String }, // 跳转
  });
  return mongoose.model('Carousel', CarouselSchema, 'carousel');
};
