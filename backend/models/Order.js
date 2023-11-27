const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
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
    }

    
},{timestamps: true} // used for created At and updated At times in moongose
)

module.exports = mongoose.model("Order", OrderSchema)