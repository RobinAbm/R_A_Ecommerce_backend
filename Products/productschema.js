var mongoose=require('mongoose')
const seller = require('../Seller/sellerschema')
mongoose.connect('mongodb://localhost:27017/Ecommerce')

var productschema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  brand:String,
  quantity:{
    type:Number,
    default:1
  },
  material:String,
  specifications:String,
  gender:{
    type:String,
    default:'male'
  },
  category:String,
  size:String,
  price:Number,
  image1:Object,
  image2:Object,
  image3:Object,
  sid:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: seller
  }
})

const products =mongoose.model('products',productschema)
module.exports =products