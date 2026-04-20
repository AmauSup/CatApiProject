const express = require('express');
const {
  getRandomCats,
  searchCats,
  getBreeds,
  getCategories
} = require('../controllers/catController');

const router = express.Router();

router.get('/random', getRandomCats);
router.get('/search', searchCats);
router.get('/breeds', getBreeds);
router.get('/categories', getCategories);

module.exports = router;
