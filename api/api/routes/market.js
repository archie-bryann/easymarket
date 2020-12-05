const express = require('express');
const router = express.Router();
const MarketController = require('../controllers/market');
const checkAuth = require('../middleware/check-auth');

const dotenv = require('dotenv');
dotenv.config();


router.get('', MarketController.get_market_status);

router.patch('/status/:status', checkAuth, MarketController.update_market_status); // only admin

module.exports = router;