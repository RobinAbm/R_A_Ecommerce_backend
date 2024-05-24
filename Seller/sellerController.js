const products = require('../Products/productschema')
const sellerschema = require('./sellerschema')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req,res,cb){
    cb(null,'./upload');
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
})

const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 }
]);
// ---------user registration---------
const regSeller=(req,res)=>{
  const newSeller = new sellerschema({
    name:req.body.name,
    number:req.body.number,
    email:req.body.email,
    password:req.body.password,
    gender:req.body.gender,
    image: req.files && req.files['image'] ? req.files['image'][0] : null
  })
  newSeller.save()

  .then(data=>{
    res.json({
      status:200,
      msg:'new seller added successfully',
      data:data
    })
  })
  .catch(err=>{
    res.send(err);
  })
}
// ---------user registration ends---------



// ---------seller login---------

const sellerLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  sellerschema
    .findOne({ email: email })
    .then((data) => {
      if (!data) {
        return res.json({
          status: 400,
          msg: "User not found"
        });
      }
      if (password === data.password) {

        if(data.isActive == true){
          return res.status(200).json({
            status: 200,
            msg: "Login successfully",
            data: data
          });
        }
        else{
            return res.json({
              status: 401,
              msg: "User is not active",
              data : 'pending'
            });
          } 
        

      } else {
        return res.json({
          status: 401,
          msg: "Password mismatch"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Internal Server Error"
      });
    });
}

// ---------seller login ends---------

// ---------seller profile view starts-------

const viewSeller = (req,res)=>{
  const {id} = req.params;
  const profile = sellerschema.findById(id)
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.log(err);
  })
}

// ---------seller profile view ends---------

// ---------All active sellers view starts-------

const allSeller = (req,res)=>{
  sellerschema.find({isActive:true})
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.log(err);
  })

}


// ---------All active sellers view ends-------

// ---------All not active sellers view starts-------

const pendingSeller = (req,res)=>{
  sellerschema.find({isActive:false})
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.log(err);
  })

}


// ---------All not active sellers view starts-------

// ---------sellers isActive to true starts-------

const approveSeller =(req,res)=>{
  const {sid} = req.params
  sellerschema.findByIdAndUpdate(sid, { isActive: true }, { new: true })
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  })
}

// ---------sellers isActive to true ends-------

// ---------sellers decline starts-------

const declineSeller = (req,res)=>{
  const {sid}= req.params;
  sellerschema.findByIdAndDelete(sid)
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  })
}

// ---------sellers decline ends-------

// ---------sellers profile edit starts-------
const editSeller=(req,res)=>{
  const {sid}= req.params;

    sellerschema.findByIdAndUpdate(sid,{
    name:req.body.name,
    number:req.body.number,
    email:req.body.email,
    password:req.body.password,
    gender:req.body.gender,
    image: req.files && req.files['image'] ? req.files['image'][0] : null
  })
  .then(data=>{
    res.json({
      status:200,
      msg:'seller updated successfully',
      data:data
    })
  })
  .catch(err=>{
    res.send(err);
  })
}

// ---------sellers profile edit starts-------



module.exports={regSeller,sellerLogin,viewSeller,allSeller,upload,approveSeller,pendingSeller,declineSeller,editSeller}