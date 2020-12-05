const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

const dotenv = require('dotenv');
dotenv.config();


router.post('/login', AdminController.admin_login); // open
router.get('/verify', AdminController.verify_admin);

module.exports = router;