const mongoose = require('mongoose')
const user = require('../User/userschema')
mongoose.connect('mongodb://localhost:27017/Ecommerce');

const addressSchema = mongoose.Schema({
  name: {
      type: String,
      default: null
    },
    pin: {
      type: Number,
      default: null
    },
    number: {
      type: Number,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    landmark: {
      type: String,
      default: null
    },uid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: user
    }
})

const address = mongoose.model('address',addressSchema)

module.exports=address;