// cartController.js
const Cart = require('./cartSchema');
const Product = require('../Products/productschema');
const User = require('../User/userschema');

// Add item to cart
const addCart = async (req, res) => {
  try {
    const { uid, pid } = req.params;

   
    const product = await Product.findById(pid);
    const user = await User.findById(uid);
    if (!product || !user) {
      return res.status(404).json({ message: 'Product or User not found' });
    }

   
    let cartItem = await Cart.findOne({ pid, uid });
    if (cartItem) {
   
     console.log('product already in cart');
    } else {
    
      cartItem = new Cart({ pid, uid});
    }

    cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart Ends


// View item of cart
const viewCart = (req, res) => {
  const uid = req.params;
  Cart.find(uid).populate('pid')
  .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.send(data);
    
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving product", error: err });
    });
};


// View item of cart ends

// Remove item from cart
const removeCart = async (req, res) => {
  const id = req.params.id; // Extract the id from req.params
  Cart.findOneAndDelete({ _id: id })
    .then(cartItem => {
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.status(200).json({ message: 'Cart item removed successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};


// Remove item of cart ends



module.exports = { addCart, viewCart,removeCart};
