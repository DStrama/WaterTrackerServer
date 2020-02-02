const mongoose = require('mongoose');
var express = require('express');
var UserAuthentication = require('../controllers/authenticationController');
var router = express.Router();

//require controller mod

router.post('/signup', UserAuthentication.SignUp )

router.post('/signin', UserAuthentication.SignIn )

module.exports = router;