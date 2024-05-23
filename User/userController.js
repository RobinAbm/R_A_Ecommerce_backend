const userschema = require('./userschema')


// ---------user registration---------
const regUser=(req,res)=>{
  const newUser = new userschema({
    name:req.body.name,
    number:req.body.number,
    email:req.body.email,
    password:req.body.password,
    gender:req.body.gender
  })
  newUser.save()

  .then(data=>{
    res.json({
      status:200,
      msg:'new user added successfully',
      data:data
    })
  })
  .catch(err=>{
    res.send(err);
  })
}
// ---------user registration ends---------

// ---------user login---------

const userLogin=(req,res)=>{
  const email=req.body.email;
  const password = req.body.password;

  userschema
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
// ---------user login ends---------


// ---------user profile view starts---------
const viewUser = (req,res)=>{
  const {id} = req.params
  const profile = userschema.findById(id)
  .then(data=>{
    return res.status(200).json({
      status: 200,
      msg: "profile fetched successfully",
      data: data
  });
  })
  .catch(err=>{
    console.log(err);
  })
}

// ---------user profile view ends---------

// ---------All sellers view starts-------

const allUser = (req,res)=>{
  userschema.find()
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.log(err);
  })

}


// ---------All sellers view ends-------

module.exports={regUser,userLogin,viewUser,allUser}