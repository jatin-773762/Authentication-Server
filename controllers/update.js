const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const updateController = (req,res)=>{

    const {token, user, password} = req.body;

    const{ id } = jwt.decode(token);
    

}

module.exports = updateController;