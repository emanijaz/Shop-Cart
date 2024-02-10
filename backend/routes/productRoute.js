const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require('../controller/productController');
const authVerify = require('../middleware/auth-verify');
const router = express.Router();


router.route('/').get(authVerify, getAllProducts);
router.route('/create').post(createProduct);
router.route('/update/:id').put(updateProduct);
router.route('/delete/:id').delete(deleteProduct);
router.route('/:id').get(getProductDetail);





module.exports = router;