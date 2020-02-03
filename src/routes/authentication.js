const express = require('express');
const UserAuthentication = require('../controllers/authenticationController');
const router = express.Router();

router.post('/signup', UserAuthentication.SignUp )

router.post('/signin', UserAuthentication.SignIn )

module.exports = router;