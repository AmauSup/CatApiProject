// NOTE : Les réponses API ne suivent pas partout le format { success, message, data } pour ne pas casser le frontend existant.
// Pour toute évolution, il est recommandé d’utiliser ce format pour plus de clarté et de cohérence.
const axios = require('axios');
// Détail d'un chat par son id (proxy TheCatAPI)
async function getCatImageById(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'id requis' });
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`, {
      headers: { 'x-api-key': process.env.CAT_API_KEY || '' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ message: 'Chat non trouvé' });
  }
}
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
      limit: Number(req.query.limit) || 10,
      excludeIds: req.query.excludeIds ? req.query.excludeIds.split(',') : []
    };
    const cats = await fetchSearchCats(filters);
    if (!cats.length) {
      return res.status(404).json({ message: 'Aucun chat trouvé pour ces filtres.' });
    }
    res.json(cats);
  } catch (error) {
    if (error.status === 429) {
      return res.status(429).json({ message: 'Trop de requêtes envoyées à TheCatAPI. Merci de patienter une minute.' });
    }
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
  getAnimalIdByApiId,
  getCatImageById
};
