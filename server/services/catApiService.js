// Récupère un chat pour chaque race de la liste
async function getCatsByBreedList(breedIds) {
  const breeds = await fetchBreeds();
  const cats = [];
  for (const breedId of breedIds) {
    const breed = breeds.find(b => b.id === breedId);
    if (!breed) continue;
    const res = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
      headers: getAuthHeaders(),
      params: { breed_id: breed.id, limit: 1, size: 'med', has_breeds: 1 }
    });
    if (res.data && res.data[0]) {
      cats.push({
        id: res.data[0].id,
        url: res.data[0].url,
        breed: breed.name,
        breedId: breed.id,
        ...res.data[0]
      });
    }
  }
  return cats;
}
// Récupère un chat par race unique (pour tournoi)
async function getCatsByUniqueBreeds(limit = 8) {
  const breeds = await fetchBreeds();
  const selectedBreeds = breeds.sort(() => 0.5 - Math.random()).slice(0, limit);
  const cats = [];
  for (const breed of selectedBreeds) {
    const res = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
      headers: getAuthHeaders(),
      params: { breed_id: breed.id, limit: 1, size: 'med', has_breeds: 1 }
    });
    if (res.data && res.data[0]) {
      cats.push({
        id: res.data[0].id,
        url: res.data[0].url,
        breed: breed.name,
        breedId: breed.id,
        ...res.data[0]
      });
    }
  }
  return cats;
}
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
    let response;
    try {
      response = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
        headers: getAuthHeaders(),
        params
      });
    } catch (err) {
      if (err.response && err.response.status === 429) {
        // On relaye l'erreur 429 pour gestion côté contrôleur
        const error = new Error('Rate limit atteint sur TheCatAPI');
        error.status = 429;
        throw error;
      }
      throw err;
    }
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
  fetchSearchCats,
  getCatsByUniqueBreeds,
  getCatsByBreedList
};
