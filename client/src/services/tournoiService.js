
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api/tournoi';


const tournoiService = {
  startTournoi: async (breedIds) => {
    const res = await axios.post(`${API_URL}/start`, breedIds ? { breedIds } : {});
    return res.data;
  },
  getTournoi: async () => {
    const res = await axios.get(`${API_URL}`);
    return res.data;
  },
  voteMatch: async (matchId, winnerId) => {
    const res = await axios.post(`${API_URL}/vote`, { matchId, winnerId });
    return res.data;
  },
  getBracket: async () => {
    const res = await axios.get(`${API_URL}/bracket`);
    return res.data;
  },
  quitTournoi: async () => {
    await axios.delete(`${API_URL}`);
  }
};

export default tournoiService;
