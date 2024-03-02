const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId:{
        type: String,
        required: [true]
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number
            }
        }
    ]
    
},{timestamps: true} // used for created At and updated At times in moongose
)

module.exports = mongoose.model("Cart", cartSchema)