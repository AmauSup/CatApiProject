// Envoie un vote (like/dislike/skip) pour un animal donné
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_VOTE_URL || 'http://localhost:5000/api/votes';


// Récupère l'id numérique à partir de l'id d'image
async function getNumericAnimalId(apiId) {
  const API_CAT_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/cats';
  const res = await axios.get(`${API_CAT_URL}/animal-id`, { params: { api_id: apiId } });
  return res.data.id;
}

export async function voteOnCat({ animalId, voteType }) {
  // animalId = id d'image (api_id)
  const numericId = await getNumericAnimalId(animalId);
  const response = await axios.post(API_BASE_URL, {
    animal_id: numericId,
    voteType
  }, { withCredentials: true });
  return response.data;
}
