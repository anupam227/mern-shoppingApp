const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken') 
// item model
const Users = require('../../models/user');

// @routes signup route
router.post('/signup',[check("email","email is required").isEmail()], (req,res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    if(!name || !email || !password){
        return res.status(400).json({
            message: "Please enter all the fields"
        })
    }

    Users.findOne({ email })
    .exec()
    .then(user => {
        if(user) {
            res.status(400).json({
                message : "Email already exists"
            })
        }else {
            bcrypt.hash(password, 10, (err,hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    })
                }else {
                    const newUser = new Users({
                        name,
                        email,
                        password: hash
                    })
                    
                    newUser.save()
                    .then(result => {
                        res.status(201).json({
                            user: {
                                id: result._id,
                                name: result.name,
                                email: result.email
                            }
                        })
                    })
                    .catch(err => {
                        res.status(401).json({
                            message: "Cannot register user",
                            error: err
                        })
                        
                    })
                }
            })
        }
    })
});


router.post('/login',[check("email","email is required").isEmail()], (req,res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    if(!email || !password){
        return res.status(400).json({
            message: "Please enter all the fields"
        })
    }

    Users.findOne({ email })
    .exec()
    .then(user => {
        if(!user) {
            res.status(400).json({
                message : "Don't have an Account"
            })
        }else { 
            bcrypt.compare(password, user.password, (err, response) => {
                if(err){
                    return res.status(401).json({
                        message: "Email not found, user dosen\'t exist"
                    })
                }
                if(response) {
                    const token = jwt.sign({ id: response._id },"KEDALGUNJALWAR", {expiresIn: 3600});
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        user: user._id,
                        id: response._id
                    })
                }
                res.status(401).json({
                    message: "Email not found, user dosen\'t exist"
                })
            })                                
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});



module.exports = router;