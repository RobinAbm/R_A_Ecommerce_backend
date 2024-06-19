const mongoose = require('mongoose')
mongoose.connect(('mongodb://localhost:27017/Ecommerce'))

var sellerschema = mongoose.Schema({
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
  },
  image:Object,
  isActive:{
    type:Boolean,
    default:false
  },
  isBan:{
    type:Boolean,
    default:false
  }
})

const seller = mongoose.model('sellers',sellerschema)

module.exports=seller