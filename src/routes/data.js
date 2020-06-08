const express = require('express');
const requireAuth = require('../middle/requireAuth');
const DataController = require('../controllers/dataController');
const router = express.Router();

router.use(requireAuth);

router.get('/data', requireAuth,DataController.getData )

router.put('/data/:id/', requireAuth,DataController.putData )

router.post('/data', requireAuth,DataController.postData )

module.exports = router;