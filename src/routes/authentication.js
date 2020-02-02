var express = require('express');
var UserAuthentication = require('../controllers/authenticationController');
var router = express.Router();

router.post('/signup', UserAuthentication.SignUp )

router.post('/signin', UserAuthentication.SignIn )

module.exports = router;