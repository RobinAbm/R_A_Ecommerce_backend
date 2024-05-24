const express = require('express')
const router = express.Router();
const productController = require('./Products/productController')
const sellerController = require('./Seller/sellerController')
const userController = require('./User/userController');
const cartController = require('./Cart/cartController')

router.post('/newproduct',productController.upload,productController.addProduct)
router.post('/viewproducts',productController.viewProducts)
router.post('/viewIndividualproducts/:id',productController.viewProductById)
router.post('/newseller',sellerController.upload,sellerController.regSeller)
router.post('/newuser',userController.upload,userController.regUser)
router.post('/viewUser/:id',userController.viewUser)
router.post('/userSearch/:search',productController.userSearch)
router.post('/viewSeller/:id',sellerController.viewSeller)
router.post('/sellerLogin',sellerController.sellerLogin)
router.post('/userLogin',userController.userLogin)
router.post('/addCart/:uid/:pid',cartController.addCart)
router.post('/viewCart/:uid',cartController.viewCart)
router.post('/removeCart/:id',cartController.removeCart)
router.post('/ownProducts/:userid',productController.ownProducts)
router.post('/allSeller',sellerController.allSeller)
router.post('/pendingSeller',sellerController.pendingSeller)
router.post('/allUser',userController.allUser)
router.post('/approveSeller/:sid',sellerController.approveSeller)
router.post('/declineSeller/:sid',sellerController.declineSeller)
router.post('/editSeller/:sid',sellerController.upload,sellerController.editSeller)
router.post('/editUser/:uid',userController.upload,userController.editUser)
router.post('/resetPasswordUser',userController.resetPassword)
router.post('/resetPasswordSeller',sellerController.resetPassword)


module.exports = router