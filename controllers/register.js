const User = require('../models/userSchema');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const registerController = (req,res)=>{
    const {email,name,password} = req.body;
    // console.log(email);
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const msg = error.array().map(err => err.msg)[0];
        return res.status(422).json({
          errors: msg
        });
      } else {
        User.findOne({
            email
        }).exec((error,user)=>{
            if(user){
                return res.status(400).send('Already Registered');
            }
        });
        const user = new User({
            email:email,
            fullname:name,
            password:password
        })

        user.save((err, user) => {
            if (err) {
            console.log('Save error'+err.message);
            return res.status(401).send('Error connecting Database');
            } else {
                const token = jwt.sign(
                    {
                    _id: user._id
                    },
                    process.env.JWT_SECRET,
                    {
                    expiresIn: '7d'
                    }
                );
            return res.status(200).json({
                success: true,
                user: {
                    firstname: user.name.first,
                    lastname: user.name.last,
                    email: user.email
                },
                token: token,
                message: 'Signup success'
            });
            }
        });
    }

}

module.exports = registerController;