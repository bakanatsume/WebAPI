const mongoose = require('mongoose')

const transactionDetails = mongoose.model('transactionDetails', {
    phoneNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    remarks : {
        type : String,
        require : true
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
})

module.exports = transactionDetails;