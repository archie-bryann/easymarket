const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');
const checkAuth = require('../middleware/check-auth');

router.get('/:userId', checkAuth, CartController.cart_get_all_for_user);

router.post('', checkAuth, CartController.add_to_cart);

router.delete('/:cartId', checkAuth, CartController.remove_from_cart);

module.exports = router;