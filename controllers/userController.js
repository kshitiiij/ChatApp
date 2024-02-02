const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const user = require('../models/userModel');
const User = mongoose.model('users');

const register = (req,res) => {
    console.log(req.body);
    var newUser = new User(req.body);
    
    // 10 is the salt passed for the hashing
    newUser.hash_password = bcrypt.hashSync(req.body.password,10);
    // newUser.save((err,user) => {
    //     if(err){
    //         res.status(400).send({message : err});
    //     } else{
    //         user.hash_password = undefined;
    //         return res.json(user);
    //     }
    // })
    newUser.save().then((err,user) => {
        if(err){
            res.status(400).send({message : err});
        }else {
            // console.log(user);
            user.hash_password = undefined;
            // console.log(user);
            return res.json(user);
        }
    })

    
};

const signin = (req,res) => {
    console.log(req.body);
    User.findOne({email : req.body.email}).then((user) => {
        // if(err) {
        //     // console.log(err);
        // }
        // console.log(user);
        if(!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({message : "Authentication failed. Invalid user or password!"})
        }
        // console.log(user.email,user.fullName);
        // the jwt.sign method takes the payload or the token as first param and the secret key as the second param
        const accessToken = jwt.sign({ email : user.email , fullName : user.fullName , _id : user._id}, 'RESTFULAPIs');
        return res.json({token : accessToken });
    });
}


// next() : It will run or execute the code after all the middleware function is finished.
// return next() : By using return next it will jump out the callback immediately and the code 
// below return next() will be unreachable.
const loginRequired = (req,res,next) => {
    if(req.user){
        next();
    } else {
        res.status(401).json({message : "Unauthorized User."});
    }
};

const profile = (req,res,next) => {
    if(req.user) {
        res.send(req.user);
        next();
    } else {
        res.status(401).json({message : "Invalid Token."});
    }
}

module.exports = {register,signin,loginRequired,profile};