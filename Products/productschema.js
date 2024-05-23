var mongoose=require('mongoose')
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
  price:Number,
  image1:Object,
  image2:Object,
  image3:Object,
  sid:String
})

const products =mongoose.model('products',productschema)
module.exports =products