// Récupère les détails d'un chat par son id (via backend)
export async function getCatById(id) {
  const response = await api.get(`/image/${id}`);
  return response.data;
}
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/cats';

const api = axios.create({
  baseURL: API_BASE_URL
});

export async function getRandomCats(limit = 8) {
  const response = await api.get('/random', { params: { limit } });
  return response.data;
}

export async function getBreeds() {
  const response = await api.get('/breeds');
  return response.data;
}

export async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}

export async function searchCats({ breedId, categoryId, limit, excludeIds }) {
  const response = await api.get('/search', {
    params: {
      breedId,
      categoryId,
      limit,
      excludeIds: excludeIds && excludeIds.length ? excludeIds.join(',') : undefined
    }
  });
  return response.data;
}
