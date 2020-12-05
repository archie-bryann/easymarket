const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const dotenv = require('dotenv');
dotenv.config();


router.get('/', checkAuth, UserController.user_get_all); // only admin

router.get('/online_users', checkAuth, UserController.get_users_online); // only admin

router.get('/online_people', checkAuth, UserController.get_people_online); // only admin

router.get('/verify', checkAuth, UserController.verify_user);

router.post('/signup', UserController.user_signup); // open

router.post('/login', UserController.user_login); // open

router.post('/verify/:email/:token', UserController.user_verification); // open

router.post('/password_recovery', UserController.user_password_recovery); // open

router.post('/password_reset/:email/:token', UserController.user_reset_password) // open [secluded] // get email & token from browser address // password in req.body

router.get('/v/:userId', checkAuth, UserController.users_get_user); // admin & particular user

router.patch('/t/:userId', checkAuth, UserController.user_update_city); // admin & particular user

router.patch('/v/:userId', checkAuth, UserController.users_update_user); // admin & particular user

module.exports = router;

 