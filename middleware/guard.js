const jwt = require('jsonwebtoken');
const registeredUser = require('../models/register_model');


module.exports.verifyUser = function (req, res, next) {
    try {
        const ticket = req.headers.authorization.split(" ")[1];
        //console.log(ticket)
        const data = jwt.verify(ticket, 'anysecretkey');
        console.log(data.userId);
        registeredUser.findOne({ _id: data.userId }).then(function (result) {
            req.userDetails = result;
            next();
        }).catch(
            function (err) {
                res.status(401).json({ error: "Invalid User" })
            }
        )
    }
    catch (e) {
        res.status(401).json({ error: "Invalid Credentials on token" })
    }
}

module.exports.verifyAdmin = function (req, res, next) {
    console.log(req.userDetails);
    if (!req.userDetails) {
        return res.status(401).json({ message: "UnAuthorized!!" })
    }
    if (req.userDetails.role == "Admin") {
        return res.status(401).json({ message: "Unauthorised Access" })
    }
    next()
}