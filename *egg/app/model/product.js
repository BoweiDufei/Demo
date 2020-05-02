'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String },
    price: { type: Number },
    number: { type: Number },
    createdAt: { type: Date, default: Date.now },
  });
  return mongoose.model('Product', OrderSchema, 'product');
};
