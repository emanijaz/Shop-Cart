const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: false
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please enter email"]
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,
    },
    phone: {
        type: Number,

    },
    gender: {
        type: String,
        default: 'Male'
    },
    profilePhoto: {
        type: String
    }
    
},{timestamps: true} // used for created At and updated At times in moongose
)

module.exports = mongoose.model("User", userSchema)