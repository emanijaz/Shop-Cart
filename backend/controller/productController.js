const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');

// create new product, admin
exports.createProduct = async (req,res, next)=> {

    const newProduct = await Product.create(req.body);
    res.status(201).json({message: "Product added successfully!", newProduct})
}

exports.updateProduct = async(req,res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler(500, "Product not found"));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        product
    })
}


exports.deleteProduct = async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler(500, "Product not found"));
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted successfully",
        product

    })

}


exports.getAllProducts = async (req,res)=> {
    const products = await Product.find()
    res.status(200).json({success: "true", products});
}


exports.getProductDetail = async (req,res)=> {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler(500, "Product not found"));

    }
    
    res.status(200).json({
        success: true,
        message: "Product found successfully",
        product
    })
}