const User = require('../models/userSchema');
const {validationResult} = require('express-validator');

const deleteController = (req,res)=>{
    const{email,password} = req.body();

    const error = validationResult(req);

    if (!error.isEmpty()) {
        const msg = error.array().map(err => err.msg)[0];
        return res.status(422).json({
          errors: msg
        });
      } else {
        User.findOneAndDelete({
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
            
            //   console.log(token);
            return res.json({
                success: true,
                message: 'User Deleted'
            });
        })
    }
}

module.exports = deleteController;