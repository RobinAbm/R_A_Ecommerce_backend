var mongoose = require('mongoose');
const products = require('../Products/productschema');
const user = require('../User/userschema');
const address = require('../Address/addressSchema');
const seller = require('../Seller/sellerschema')
mongoose.connect('mongodb://localhost:27017/Ecommerce');

var buySchema = mongoose.Schema({
  cardName:{
    type:String
  },
  cardNumber:{
    type:Number
  },
  expiryDate:{
    type:Date
  },
  cardCvv:{
    type:Number
  }
  ,pid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: products
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: user
  },
  aid:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: address
  },
  sid:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:seller
  },
  date:{
    type: Date,
    default: Date.now
  }
});

const buy = mongoose.model('buy', buySchema);
module.exports = buy;
