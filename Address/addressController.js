const addressSchema = require('./addressSchema')



// --------- user address reset starts-------


const newAddress = (req, res) => {
  const { uid } = req.params;

  
  const address = new addressSchema({
    name: req.body.name,
    pin: req.body.pin,
    number: req.body.number,
    city: req.body.city,
    state: req.body.state,
    landmark: req.body.landmark,
    uid: uid 
  })

  address.save()
    .then(data => {
      res.status(201).json({
        status: 201,
        msg: 'Address created successfully',
        data: address
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

// --------- user address reset ends-------

// --------- address fetch starts-------

const showAddress = (req, res) => {
  const { uid } = req.params;

  addressSchema.find({ uid: uid })
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({
          status: 404,
          msg: 'No addresses found for this user',
        });
      }
      res.status(200).json({
        status: 200,
        msg: 'Address fetched successfully',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = showAddress;



// --------- address fetch ends-------

// --------- address delete starts-------

const deleteAddress =(req,res)=>{
  const {aid} = req.params;
  addressSchema.findByIdAndDelete(aid)
  .then(data => {
    res.status(201).json({
      status: 201,
      msg: 'Address deleted successfully',
    });
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

// --------- address delete ends-------


// --------- address edit starts-------

const editAddress = (req,res)=>{
  const {aid} = req.params;
  addressSchema.findByIdAndUpdate(aid,{
    name: req.body.name,
    pin: req.body.pin,
    number: req.body.number,
    city: req.body.city,
    state: req.body.state,
    landmark: req.body.landmark,
  })
  .then(data => {
    res.status(201).json({
      status: 201,
      msg: 'Address edited successfully',
      data:data
    });
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

// --------- address edit starts-------

module.exports = {newAddress,showAddress,deleteAddress,editAddress};