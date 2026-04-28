// Contrôleur pour la gestion du tournoi
const tournoiService = require('../services/tournoiService');

module.exports = {
    /**
     * Supprime le tournoi en cours
     * @route DELETE /api/tournoi
     */
    deleteTournoi: async (req, res) => {
      try {
        await tournoiService.deleteTournoi();
        res.status(204).end();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },
  /**
   * Démarre un nouveau tournoi
   * @route POST /api/tournoi
   */
  startTournoi: async (req, res) => {
    try {
      const { breedIds } = req.body;
      const tournoi = await tournoiService.startTournoi(breedIds);
      res.status(201).json(tournoi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère l’état du tournoi
   * @route GET /api/tournoi
   */
  getTournoi: async (req, res) => {
    try {
      const tournoi = await tournoiService.getTournoi();
      res.json(tournoi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Vote pour un match du tournoi
   * @route POST /api/tournoi/vote
   */
  voteMatch: async (req, res) => {
    try {
      const { matchId, winnerId } = req.body;
      const tournoi = await tournoiService.voteMatch(matchId, winnerId);
      res.json(tournoi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Récupère le bracket du tournoi
   * @route GET /api/tournoi/bracket
   */
  getBracket: async (req, res) => {
    try {
      const bracket = await tournoiService.getBracket();
      res.json(bracket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
