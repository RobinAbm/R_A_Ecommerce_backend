const mongoose = require('mongoose')
mongoose.connect(('mongodb://localhost:27017/Ecommerce'))

var userchema = mongoose.Schema({
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
  image:Object
})



const user = mongoose.model('users',userchema)

module.exports=user