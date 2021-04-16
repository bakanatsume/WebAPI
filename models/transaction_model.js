const mongoose = require('mongoose')

const transactionDetails = mongoose.model('transactionDetails', {
    senderPhoneNumber: {
        type: String,
        required: true
    },
    receiverPhoneNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dateAndTime: {
        type: String
    },
    remarks: {
        type: String,
    }
})

module.exports = transactionDetails;