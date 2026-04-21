const express = require('express');
const {
  getRandomCats,
  searchCats,
  getBreeds,
  getCategories
} = require('../controllers/catController');

const router = express.Router();

const { insertAnimalHandler } = require('../controllers/animalController');
const { getAnimalIdByApiId } = require('../controllers/catController');

router.get('/random', getRandomCats);
router.post('/animals', insertAnimalHandler);
router.get('/search', searchCats);
router.get('/animal-id', getAnimalIdByApiId);
router.get('/breeds', getBreeds);
router.get('/categories', getCategories);

module.exports = router;
