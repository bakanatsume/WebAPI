const mongoose = require('mongoose');

const register = mongoose.model('users', {
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    gender: {
        type: String,
        // required: true,
    },
    age: {
        type: String,
        
    },
    address : {
        type: String,
    },
    password: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    userBalance:{
        type:Number,
        default:0
    },
    role: {
        type: String,
        enum: ["Admin", "Client"],
        default: "Client"
    }
}
)
module.exports = register;