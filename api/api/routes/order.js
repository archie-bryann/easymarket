const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, OrderController.orders_create_order); // only user

router.get('/', checkAuth, OrderController.orders_get_all); // only admin

router.get('/status/:status', checkAuth, OrderController.get_status_orders); // only admin

router.get('/user/:userId', checkAuth, OrderController.get_all_previous_orders_for_user); // open {{ for particular user }}

router.get('/d/:orderId', checkAuth, OrderController.orders_get_order); // open // make use of timestamp

router.patch('/t/:orderId', checkAuth, OrderController.orders_update_order_status); // open {{ for particular user }}

module.exports = router;