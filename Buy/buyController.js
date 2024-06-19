const buySchema = require('./buySchema')
const productSchema = require('../Products/productschema')
const cart = require('../Cart/cartSchema')

// ------------  product buy starts  -------------------
const buyProduct = async (req, res) => {
  const { uid, pid, aid ,sid } = req.params;
  console.log('uid -', uid, 'pid -', pid, 'aid -', aid);

  try {
    // Find the product by pid
    const product = await productSchema.findById(pid);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if the product has enough quantity
    if (product.quantity < 1) {
      return res.status(400).json({ msg: 'Product is out of stock' });
    }

    // Decrease the quantity by 1
    product.quantity -= 1;
    await product.save();

    // Save the purchase details
    const buy = new buySchema({
      cardName: req.body.cardName,
      cardNumber: req.body.cardNumber,
      expiryDate: req.body.expiryDate,
      cardCvv: req.body.cardCvv,
      pid: pid,
      uid: uid,
      aid: aid,
      sid:sid,
    });
    
    const data = await buy.save();
    
    res.status(201).json({
      status: 201,
      msg: 'Product bought successfully',
      data: buy
    });
  } catch (err) {
    res.status(500).send(err);
  }
};



// ------------  product buy ends  -------------------


// ------------ cart product buy starts  -------------------


const cartBuy = async (req, res) => {
  const { uid, aid } = req.params;
  try {
    const cartItems = await cart.find({ uid: uid }).exec();

    for (const cartItem of cartItems) {
      await cartItem.populate('pid')
      const product = cartItem.pid;
      if (!product || product.quantity < 1) {
        return res.status(400).json({ msg: 'Product is out of stock' });
      }
      product.quantity -= 1;
      await product.save();
      const buy = new buySchema({
        cardName: req.body.cardName,
        cardNumber: req.body.cardNumber,
        expiryDate: req.body.expiryDate,
        cardCvv: req.body.cardCvv,
        pid: cartItem.pid,
        uid: uid,
        aid: aid,
        sid:product.sid,
      });
      await buy.save();
      await cart.deleteMany({ uid: uid });
    }
    res.status(201).json({
      status: 201,
      msg: 'Products bought successfully',
      data: cartItems  
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};




// ------------cart  product buy ends  -------------------


// ------------   buy history starts  -------------------
const viewHistory = (req, res) => {
  const { uid } = req.params;

  buySchema.find({ uid: uid })
    .populate({
      path: 'pid',
      populate: {
        path: 'sid'
      }
    })
    .populate('aid')
    .populate('uid')
    .sort({ _id: -1 }) // Sort by _id in descending order
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
    // Find purchases associated with the seller's products
    const purchases = await buySchema.find({ sid }).populate('pid uid aid').sort({ _id: -1 });
    console.log('Purchases:', purchases); // Debug log

    if (!purchases.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No purchases found for this seller',
      });
    }

    // Extract valid product IDs from purchases
    const productIds = purchases
      .filter(purchase => purchase.pid && purchase.pid._id) // Filter out null or undefined pid
      .map(purchase => purchase.pid._id);

    // Find products that match the purchased product IDs
    const products = await productSchema.find({ _id: { $in: productIds } });
    console.log('Products:', products); // Debug log

    // Identify purchases without corresponding products (deleted products)
    const deletedPurchases = purchases.filter(purchase => {
      if (!purchase.pid || !purchase.pid._id) {
        return true; // Handle null or undefined pid
      }
      return !products.find(product => product._id.equals(purchase.pid._id));
    });

    res.status(200).json({
      status: 200,
      msg: 'History fetched successfully',
      data: {
        purchases,
        deletedPurchases,
      },
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



module.exports={buyProduct,viewHistory,sellerHistory,cartBuy}