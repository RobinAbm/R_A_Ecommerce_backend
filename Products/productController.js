const productschema=require('./productschema')
const multer = require('multer');

// ---------multer image upload---------
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
]);
// ---------multer image upload---------

// ---------new product---------
const addProduct=(req,res)=>{

  console.log("data",req);
  const newproduct = new productschema({
    name:req.body.name,
    brand:req.body.brand,
    quantity:req.body.quantity,
    material:req.body.material,
    specifications:req.body.specifications,
    price:req.body.price,
    image1: req.files['image1'] ? req.files['image1'][0] : null,
    image2: req.files['image2'] ? req.files['image2'][0] : null,
    image3: req.files['image3'] ? req.files['image3'][0] : null,
    sid:req.body.sid
  })
  newproduct.save()
  .then(data=>{
    res.json({
      status:200,
      msg:'new product added successfully',
      data:data
    })
  })
  .catch(err=>{
    res.send(err);
  })
}
// ---------new product ends---------

// ---------view all product---------
const viewProducts=(req,res)=>{
  productschema.find()
  .then(data=>{
    res.send(data)
    console.log(data);
  })
  .catch(err=>{
    res.send(err)
  })
}
// ---------view all product ends---------

// ---------view individual product---------

const viewProductById = (req, res) => {
  const productId = req.params.id;

  productschema.findById(productId)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving product", error: err });
    });
};

// ---------view individual product ends---------

// ---------view Search products starts---------

const userSearch = (req, res) => {
  const { search } = req.params;
  console.log(search);
  
  productschema.find({ name: search }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};


// ---------view Search products ends---------

// ---------own products view starts---------

const ownProducts = (req,res)=>{
  const {userid} = req.params
  console.log(userid);
  productschema.find({sid:userid})
  .then(data=>{
    res.send(data)
  })
  .catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
}

// ---------own products view ends---------

module.exports={addProduct,viewProducts,upload,viewProductById,userSearch,ownProducts};

