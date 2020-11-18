const express = require('express');
const router = express.Router();
const MiscellaneousController = require('../controllers/miscellaneous');
const checkAuth = require('../middleware/check-auth');

router.post('/fee', checkAuth, MiscellaneousController.delivery_cost);

router.get('/verify/transaction/:reference', MiscellaneousController.verify_transaction);

module.exports = router;