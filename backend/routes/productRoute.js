const express = require('express');
const { getAllProducts, createProduct } = require('../controller/productController');
const router = express.Router();


router.route('/').get(getAllProducts);
router.route('/create').post(createProduct);



module.exports = router;