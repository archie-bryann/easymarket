const express = require('express');
const router = express.Router();
const LogisticsController = require('../controllers/logistics');

router.post('/login', LogisticsController.login); // open
router.get('/verify', LogisticsController.verify);

module.exports = router;