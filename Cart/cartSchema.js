var mongoose = require('mongoose');
const products = require('../Products/productschema');
const user = require('../User/userschema');
mongoose.connect('mongodb://localhost:27017/Ecommerce');

var cartSchema = mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: products
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: user
  },
  date: {
    type: Date,
    default: Date.now
  },
  quantity:{
    type:Number,
    default:1
  }
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
