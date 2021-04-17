const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const guard = require('../middleware/guard');
const register = require('../models/register_model');
const transactionDetails = require('../models/transaction_model');

//--------------------------------------Adding Fund------------------------------------------//
router.post('/sendMoney', (req, res) => {
    console.log(req.body.senderPhoneNumber)
    var date = new Date();
    function createDateAsUTC(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }
    const Transaction = new transactionDetails({
        senderPhoneNumber: req.body.senderPhoneNumber,
        receiverPhoneNumber: req.body.receiverPhoneNumber,
        amount: req.body.amount,
        remarks: req.body.remarks,
        dateAndTime: date
    })
    Transaction.save()
        .then(async data => {
            await register.find({ phoneNumber: data.senderPhoneNumber })
                .then(async user1 => {
                    // console.log('user1', user1)
                    if (user1.length == 0) {
                        return res.status(400).json({ success: false, message: "Invalid Credentials" })
                    }
                    else {
                        let balance = user1[0].userBalance - data.amount
                        user1[0].userBalance = balance
                        await register.updateOne({ _id: user1[0]._id }, user1[0])
                    }
                })

            await register.find({ phoneNumber: data.receiverPhoneNumber })
                .then(async user2 => {
                    // console.log('user2', user2)
                    if (user2.length == 0) {
                        return res.status(400).json({ success: false, message: "Invalid Credentials" })
                    }
                    else {
                        let balance = user2[0].userBalance + data.amount
                        user2[0].userBalance = balance
                        await register.updateOne({ _id: user2[0]._id }, user2[0])
                    }
                })
            return res.status(200).json({ success: true, message: "Fund has been transferred" })
        })
        .catch(e => {
            res.status(404).json({ error: e })
        })
})
//-----------------------------------------Show Transaction Details--------------------------------------///

router.get('/transactionDetails/:id', function (req, res) {
    transactionDetails.find({senderPhoneNumber:req.params.id})
    .then(function (data) {
        res.send(data);
    }).catch(function(err){
        res.send(400).json({error:err})
    })
})

//---------------------------------------Delete transaction History----------------------------------------//

router.delete('/deleteTransaction/:id', function (req, res) {
    transactionDetails.deleteOne({ _id: req.params.id }).
        then(function () {
            res.status(200).json({ message: "Deleted Successfully" })
        }).catch(function (err) {
            res.statusCode(404).json({ error: err })
        })
})

module.exports = router;