const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const loginController = (req,res)=>{

    const{email,password} = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
        const msg = error.array().map(err => err.msg)[0];
        return res.status(422).json({
          errors: msg
        });
      } else {
        User.findOne({
            email
        }).exec((err,user)=>{
            if(err || !user){
                console.log("error " + err);
                return res.status(404).send('No user found!');
                
            }
            if(!user.authenticate(password)){
                console.log(password);
                return res.status(401).send("Invalid Password");
            }
            const token = jwt.sign(
                {
                _id: user._id
                },
                process.env.JWT_SECRET,
                {
                expiresIn: '7d'
                }
            );
            //   console.log(token);
            return res.json({
                success: true,
                user: {
                    firstname: user.name.first,
                    lastname: user.name.last,
                    email: user.email
                },
                token: token,
                message: 'Login success'
            });
        })
    }
}

module.exports = loginController;