const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();


router.route('/').get(getAllProducts);
router.route('/create').post(createProduct);
router.route('/update/:id').put(updateProduct);
router.route('/delete/:id').delete(deleteProduct);




module.exports = router;