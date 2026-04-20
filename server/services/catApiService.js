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

async function fetchSearchCats({ breedId, categoryId, limit }) {
  const params = {
    limit,
    has_breeds: 1,
    order: 'RANDOM'
  };

  if (breedId) {
    params.breed_ids = breedId;
  }

  if (categoryId) {
    params.category_ids = categoryId;
  }

  const response = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
    headers: getAuthHeaders(),
    params
  });

  return response.data;
}

module.exports = {
  fetchRandomCats,
  fetchBreeds,
  fetchCategories,
  fetchSearchCats
};
