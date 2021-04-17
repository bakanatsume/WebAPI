const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const connect = require('./database/database')
const userRoute = require('./routes/registerUser');
const transactionRoute = require('./routes/transaction');

const app = express();


app.use(express.json());
app.use('/pictures', express.static('./pictures'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(userRoute);
app.use(transactionRoute);

app.get("/",function(req,res){
    res.send("Welcome to Chhantyal's Bank")
})

app.listen(2020);