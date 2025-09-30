const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
