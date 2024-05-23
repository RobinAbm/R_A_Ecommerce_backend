const mongoose = require('mongoose')
mongoose.connect(('mongodb://localhost:27017/Ecommerce'))

var sellerchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  number:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    default:"male"
  }
})

const seller = mongoose.model('sellers',sellerchema)

module.exports=seller