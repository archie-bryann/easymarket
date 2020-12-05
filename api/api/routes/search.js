const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search');

const dotenv = require('dotenv');
dotenv.config();


router.get('/:q', SearchController.get_search_results);

module.exports = router;