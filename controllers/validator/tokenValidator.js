const jwt = require('jsonwebtoken');
const valid = (req,res,next)=>{
    const token = req.params.token;

    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            res.status(498).send('Invalid token');
        }
        else{
            next();
        }
    });

}
module.exports = valid;