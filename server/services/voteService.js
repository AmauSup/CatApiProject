const db = require('../services/db');

// Met à jour les stats de la race selon le vote
async function voteOnBreed({ animal_id, voteType, user_id }) {
  const animalRes = await db.query('SELECT breed_id, breed_name, animal_type FROM animals WHERE id = $1', [animal_id]);
  if (!animalRes.rows.length) throw new Error('Animal inconnu');
  const { breed_id, breed_name, animal_type } = animalRes.rows[0];

  // Toujours tenter d'insérer, si conflit alors update
  await db.query(
    `INSERT INTO breed_stats (breed_id, breed_name, animal_type, total_votes, upvotes, downvotes)
     VALUES ($1, $2, $3, 1, $4, $5)
     ON CONFLICT (breed_id, animal_type) DO UPDATE SET
       total_votes = breed_stats.total_votes + 1,
       upvotes = breed_stats.upvotes + EXCLUDED.upvotes,
       downvotes = breed_stats.downvotes + EXCLUDED.downvotes,
       updated_at = CURRENT_TIMESTAMP
    `,
    [
      breed_id,
      breed_name,
      animal_type,
      voteType === 'like' ? 1 : 0,
      voteType === 'dislike' ? 1 : 0
    ]
  );
}

module.exports = { voteOnBreed };
