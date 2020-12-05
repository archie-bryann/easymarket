const express = require('express');
const router = express.Router();
const LogisticsController = require('../controllers/logistics');

const dotenv = require('dotenv');
dotenv.config();


router.post('/login', LogisticsController.login); // open
router.get('/verify', LogisticsController.verify);

module.exports = router;