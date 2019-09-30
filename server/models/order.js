var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');

var orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  products: { type: [Product.Schema] },
  quantity: { type: Number }
});


module.exports = mongoose.model('orders', orderSchema);
