const express = require('express');
const authVerify = require('../middleware/auth-verify');

const { createOrder, getAllOrders } = require('../controller/orderController');
const router = express.Router();


router.route('/create').post(authVerify,createOrder);
router.route('/').get(authVerify,getAllOrders);



module.exports = router;