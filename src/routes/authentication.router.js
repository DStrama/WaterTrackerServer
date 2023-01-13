const express = require('express');
const UserAuthentication = require('../controllers/authentication.controller');
const router = express.Router();

router.post('/signup', UserAuthentication.SignUp )

router.post('/signin', UserAuthentication.SignIn )

module.exports = router;