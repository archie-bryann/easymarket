const express = require('express');
const router = express.Router();
const MiscellaneousController = require('../controllers/miscellaneous');
const checkAuth = require('../middleware/check-auth');


router.get('/fee/:city', checkAuth, MiscellaneousController.city_cost);

router.post('/fee', checkAuth, MiscellaneousController.delivery_cost);

router.get('/verify/transaction/:reference', checkAuth, MiscellaneousController.verify_transaction);


module.exports = router;