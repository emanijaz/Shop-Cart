const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    products: [
        {
            productId: {
                type: String
            },
            productName: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
            price:{
                type: Number,
                default: 0
            },
            url: {
                type: String,
            }
                
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    },
    userEmail: {
        type: String,
    }

    
},{timestamps: true} // used for created At and updated At times in moongose
)

module.exports = mongoose.model("Order", OrderSchema)
