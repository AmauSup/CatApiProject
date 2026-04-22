// Route pour récupérer les stats de votes par race
const express = require('express');
const router = express.Router();
const db = require('../services/db');

// GET /api/cats/breed-stats
router.get('/breed-stats', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT breed_id, breed_name, animal_type, total_votes, upvotes, downvotes
       FROM breed_stats WHERE animal_type = 'cat' ORDER BY total_votes DESC, breed_name ASC`
    );
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ message: 'Erreur stats' });
  }
});

module.exports = router;
