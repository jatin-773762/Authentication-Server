const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const { use } = require('../routes/authRoute');

const changePassword = (req,res)=>{

    const{email,password,newPassword} = req.body;

    const error = validationResult(req);

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if(!user.authenticate(password)){
            console.log(password);
            return res.status(401).send("Invalid Password");
        }

        user.password = newPassword;

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
                message: 'Password updated successfully'
            });
            }
        });

    })
}

module.exports = changePassword;