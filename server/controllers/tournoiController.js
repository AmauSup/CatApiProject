// Contrôleur pour la gestion du tournoi
const tournoiService = require('../services/tournoiService');

module.exports = {
  startTournoi: async (req, res) => {
    try {
      const { breedIds } = req.body;
      const tournoi = await tournoiService.startTournoi(breedIds);
      res.status(201).json(tournoi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTournoi: async (req, res) => {
    try {
      const tournoi = await tournoiService.getTournoi();
      res.json(tournoi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  voteMatch: async (req, res) => {
    try {
      const { matchId, winnerId } = req.body;
      const tournoi = await tournoiService.voteMatch(matchId, winnerId);
      res.json(tournoi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getBracket: async (req, res) => {
    try {
      const bracket = await tournoiService.getBracket();
      res.json(bracket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
