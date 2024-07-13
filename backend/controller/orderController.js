const Order = require('../models/Order');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/asyncError');

exports.createOrder = catchAsyncError(async (req,res, next)=> {
    const new_order = req.body;
    const newOrder = await Order.create(new_order);
    console.log('new created order: ', newOrder)
    res.status(201).json({message: "Order created successfully!", newOrder})
});


exports.getAllOrders =catchAsyncError( async (req,res)=> {
    const orders = await Order.find()
    res.status(200).json({success: "true", orders});
});
