const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter Product Name"]
    },
    description:{
        type:String,
        required: [true, "PLease Enter Product Description"]
    },
    price:{
        type: Number,
        required: [true, "Please enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    rating:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    ],
    category:{
        type: String,
        required: [true, "Please enter Product Category"]
    },
    stock:{
        type: Number,
        required: [true, "Please enter Product quantity"],
        maxLength: [10, "Quantity cannot be more than 10"],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            title:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true,
                default: 0,
            },
            comment:{
                type: String,

            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("Product", productSchema)