const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const ObjectId = require('mongodb').ObjectID;
const {validationResult} = require('../controllers/validator/valid');
const fetchUser = (req,res)=>{

    const token = req.params.token;
    console.log(token);
    const {_id} = jwt.decode(token);

    console.log(_id);
    User.findById(ObjectId(_id))
    .then(doc=>{
        // console.log(doc)
        return res.send({
            firstname:doc.name.first,
            lastname: doc.name.last,
            email:doc.email
        })

    })
    .catch(err=>{
        console.log(err);
    return res.send(err)

    });


}

module.exports = fetchUser;