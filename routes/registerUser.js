const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = require('../models/register_model');
const upload = require('../middleware/fileUpload');

var balance = 0 ;

// ------------------------------- User Registartion ---------------------------------------------
router.post('/registerUser', [
],  function (req, res) { 
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            address : req.body.address,
            gender: req.body.gender,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: req.body.role
        }
        bcryptjs.hash(data.password, 10, function (err, hash) {
            data.password = hash;
            const dataInsert = new Register(data);
            dataInsert.save()

                .then(function (result) {
                    res.status(201).json({success:true, message: "Insert Successfull" })
                })
                .catch(function (errors) {
                    res.status(500).json({succes:false, error: errors })
                })
        })
})


// ---------------------------------------------------------- Login validation -------------------------------------

router.post('/login', function (req, res) {
    console.log(req.body)
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    
    Register.findOne({ phoneNumber: phoneNumber })
        .then(function (data) {
            if (data === null) {

                return res.status(200).json({success:false, message: "Invalid Credentials" })
            }
            bcryptjs.compare(password, data.password, function (err, response) {
                if (response === false) {
                    return res.status(200).json({success:false, message: "Invalid Credentials" })
                }
                const token = jwt.sign({ userId: data._id }, 'anysecretkey');
                return res.status(200).json({ success:true,message: "Login Success", token: token,data:data});
            })
        })
        .catch(function (e) {
            res.status(500).json({success:false, message: e })
        })
})

////////////////////////////////////////----update PRofile

router.put('/updateProfile/:id', function (req, res) {
    console.log(req.body)
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,    
        age: req.body.age,
        address: req.body.address,
        email: req.body.email,
    }
    Register.updateOne({ _id: req.params.id }, data)
        .then(function () {
            res.status(200).json({ success: true,message: "profile Updated Successfully" })
        })
        .catch(function (err) {
            res.status(400).json({ error: err })
        })

})

//////////////////////////find User

router.get('/findUser/:id', function (req, res) {
    Register.findOne({ _id: req.params.id })
        .then(function (data) {
            res.send(data)
        })
        .catch((err) => {
            res.status(400).json({ error: err })
        })
})

///---------------------------------update profile PIcture -------------------
router.put('/updatePicture/:id', upload.single('profilePicture'), function (req, res) {
    console.log(req.params)
    console.log(req.file.path)
    const  profilePicture = req.file.path
    Register.findOneAndUpdate({ _id: req.params.id }, {profilePicture : profilePicture})
        .then(function () {
            res.status(200).json({ success: true,message: "profile Updated Successfully" })
        })
        .catch(function (err) {
            res.status(400).json({ error: err })
        })

})

/////////////////////////

module.exports = router;