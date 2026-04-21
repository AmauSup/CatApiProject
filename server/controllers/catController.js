// Récupère l'id numérique d'un animal à partir de son api_id
const db = require('../services/db');
async function getAnimalIdByApiId(req, res) {
  const api_id = req.query.api_id;
  if (!api_id) return res.status(400).json({ message: 'api_id requis' });
  try {
    const result = await db.query('SELECT id FROM animals WHERE api_id = $1', [api_id]);
    if (!result.rows.length) return res.status(404).json({ message: 'Animal non trouvé' });
    res.json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
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
  getCategories,
  getAnimalIdByApiId
};
