const axios = require('axios');

const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1';

function getAuthHeaders() {
  return {
    'x-api-key': process.env.CAT_API_KEY || ''
  };
}

async function fetchRandomCats(limit) {
  const response = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
    headers: getAuthHeaders(),
    params: {
      limit,
      size: 'med',
      has_breeds: 1
    }
  });

  return response.data;
}

async function fetchBreeds() {
  const response = await axios.get(`${CAT_API_BASE_URL}/breeds`, {
    headers: getAuthHeaders()
  });

  return response.data;
}

async function fetchCategories() {
  const response = await axios.get(`${CAT_API_BASE_URL}/categories`, {
    headers: getAuthHeaders()
  });

  return response.data;
}

async function fetchSearchCats({ breedId, categoryId, limit, excludeIds = [] }) {
  // TheCatAPI limite à 100 images max par requête
  const batchSize = 100;
  let uniqueCats = new Map();
  let tries = 0;
  const maxTries = 10;
  const excludeSet = new Set(excludeIds);
  while (uniqueCats.size < limit && tries < maxTries) {
    const params = {
      limit: Math.min(batchSize, limit - uniqueCats.size),
      has_breeds: 1,
      order: 'RANDOM'
    };
    if (breedId) params.breed_ids = breedId;
    if (categoryId) params.category_ids = categoryId;
    const response = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
      headers: getAuthHeaders(),
      params
    });
    for (const cat of response.data) {
      if (!excludeSet.has(cat.id) && !uniqueCats.has(cat.id)) {
        uniqueCats.set(cat.id, cat);
      }
    }
    tries++;
    // Si l'API ne renvoie plus rien de nouveau, on arrête
    if (response.data.length === 0) break;
  }
  return Array.from(uniqueCats.values()).slice(0, limit);
}

module.exports = {
  fetchRandomCats,
  fetchBreeds,
  fetchCategories,
  fetchSearchCats
};
