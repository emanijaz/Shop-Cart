const Product = require('../models/Product')


exports.createProduct = async (req,res, next)=> {

    const newProduct = await Product.create(req.body);
    res.status(201).json({success: true, newProduct})
}

exports.getAllProducts = (req,res)=> {
    res.status(200).json({message: "get all products"});
}