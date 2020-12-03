const express = require('express');
const router = express.Router();
const MiscellaneousController = require('../controllers/miscellaneous');
const checkAuth = require('../middleware/check-auth');


router.get('/fee/:city', checkAuth, MiscellaneousController.city_cost);

router.get('/fee/:subtotal/:city', checkAuth, MiscellaneousController.delivery_cost);

router.get('/verify/transaction/:reference/:logisticFee/:subtotal', checkAuth, MiscellaneousController.verify_transaction);

router.get('/search/:q', checkAuth, MiscellaneousController.sudo_search);

router.get('/dashboard', checkAuth, MiscellaneousController.dashboard);

router.get('/order/search/:q', checkAuth, MiscellaneousController.order_search)

module.exports = router;