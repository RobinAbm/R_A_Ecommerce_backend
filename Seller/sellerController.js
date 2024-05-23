const products = require('../Products/productschema')
const sellerchema = require('./sellerschema')

// ---------user registration---------
const regSeller=(req,res)=>{
  const newSeller = new sellerchema({
    name:req.body.name,
    number:req.body.number,
    email:req.body.email,
    password:req.body.password,
    gender:req.body.gender
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

const sellerLogin=(req,res)=>{
  const email=req.body.email;
  const password = req.body.password;

  sellerchema
  .findOne({email:email})
  .then((data) => {
    if (!data) {
        return res.json({
            status: 400,
            msg: "User not found"
        });
    }
    if (password === data.password) {
        return res.status(200).json({
            status: 200,
            msg: "Login successfully",
            data: data
        });
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
  const profile = sellerchema.findById(id)
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.log(err);
  })
}

// ---------seller profile view ends---------

// ---------All sellers view starts-------

const allSeller = (req,res)=>{
  sellerchema.find()
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.log(err);
  })

}


// ---------All sellers view ends-------

module.exports={regSeller,sellerLogin,viewSeller,allSeller}