const express = require('express');
const router = express.Router();
const FeeController = require('../controllers/fee');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, FeeController.delivery_cost);

module.exports = router;