const seller = require('../Seller/sellerschema');
const buySchema = require('./buySchema')
const productSchema = require('../Products/productschema')

// ------------  product buy starts  -------------------

const buyProduct=(req,res)=>{
  const {uid} = req.params;
  const {pid} = req.params;
  const {aid} = req.params;
  console.log('uid -',uid,'pid -',pid,'aid -',aid);

  const buy = new buySchema({
    cardName:req.body.cardName,
    cardNumber:req.body.cardNumber,
    expiryDate:req.body.expiryDate,
    cardCvv:req.body.cardCvv,
    pid:pid,
    uid:uid,
    aid:aid,
  })
    buy.save()
    .then(data => {
      res.status(201).json({
        status: 201,
        msg: 'product bought successfully',
        data: buy
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};



// ------------  product buy ends  -------------------

// ------------   buy history starts  -------------------

const viewHistory = (req,res)=>{
  const {uid} = req.params;

  buySchema.find({uid:uid}).populate('pid').populate('aid')
  .then(data => {
    if (data.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: 'No history found for this user',
      });
    }
    res.status(200).json({
      status: 200,
      msg: 'History fetched successfully',
      data: data
    });
  })
  .catch(err => {
    res.status(500).send(err);
  });
};




// ------------  buy history starts  -------------------




// ------------ seller buy history starts  -------------------
const sellerHistory = async (req, res) => {
  const { sid } = req.params;
  
  try {
    // Find products associated with the seller
    const products = await productSchema.find({ sid: sid });
    console.log('Products:', products); // Debug log

    if (!products.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No products found for this seller',
      });
    }

    const productIds = products.map(product => product._id);

    // Find purchases associated with the product IDs
    const purchases = await buySchema.find({ pid: { $in: productIds } }).populate('pid uid aid');
    console.log('Purchases:', purchases); // Debug log

    if (!purchases.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No purchases found for these products',
      });
    }

    res.status(200).json({
      status: 200,
      msg: 'History fetched successfully',
      data: purchases,
    });
  } catch (err) {
    console.error('Error:', err); // Debug log
    res.status(500).json({
      status: 500,
      msg: 'Internal Server Error',
      error: err.message,
    });
  }
};


// ------------seller  buy history ends  -------------------

module.exports={buyProduct,viewHistory,sellerHistory}