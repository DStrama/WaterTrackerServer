const express = require('express');
const requireAuth = require('../middle/requireAuth');
var WaterController = require('../controllers/waterController');
const router = express.Router();

router.use(requireAuth);

router.get('/water',WaterController.getWater )

router.post('/water',WaterController.postWater )

router.put('/water/:id/',WaterController.putWater )

router.delete('/water/:id/',WaterController.deleteWater )

module.exports = router;

