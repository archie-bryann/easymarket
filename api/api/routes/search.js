const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search');

router.get('/:q', SearchController.get_search_results);

module.exports = router;