const router = require('express').Router();

const {validLogin,validRegister,validUpdate} = require('../controllers/validator/valid');
const tokenValidator = require('../controllers/validator/tokenValidator');
//get user data
router.get('/user/profile/:token',tokenValidator,require('../controllers/fetchUser'));

// login user
router.post('/user/login',validLogin,require('../controllers/login'))

//register new user
router.post('/user/register',validRegister,require('../controllers/register'))

// //delete account
router.post('/user/delete',require('../controllers/delete'))

//update password
router.post('/user/changePassword',validUpdate,require('../controllers/changePassword'))

// //update account
// router.post('/user/update',tokenValidator,require('../controllers/update'))


module.exports = router;