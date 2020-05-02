'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    desc: { type: String },
    totalPrice: { type: Number },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model('Order', OrderSchema, 'order');
};
