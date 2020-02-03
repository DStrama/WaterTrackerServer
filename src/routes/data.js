const express = require('express');
const requireAuth = require('../middle/requireAuth');
const DataController = require('../controllers/dataController');
const router = express.Router();

router.use(requireAuth);

router.get('/data', requireAuth,DataController.getData )

router.post('/data', requireAuth,DataController.postData )

module.exports = router;