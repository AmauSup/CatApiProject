const {
  fetchRandomCats,
  fetchBreeds,
  fetchCategories,
  fetchSearchCats
} = require('../services/catApiService');

async function getRandomCats(req, res, next) {
  try {
    const limit = Number(req.query.limit) || 8;
    const cats = await fetchRandomCats(limit);
    res.json(cats);
  } catch (error) {
    next(error);
  }
}

async function searchCats(req, res, next) {
  try {
    const filters = {
      breedId: req.query.breedId,
      categoryId: req.query.categoryId,
      limit: Number(req.query.limit) || 10
    };

    const cats = await fetchSearchCats(filters);
    res.json(cats);
  } catch (error) {
    next(error);
  }
}

async function getBreeds(req, res, next) {
  try {
    const breeds = await fetchBreeds();
    res.json(breeds);
  } catch (error) {
    next(error);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await fetchCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRandomCats,
  searchCats,
  getBreeds,
  getCategories
};
