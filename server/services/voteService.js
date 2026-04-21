const db = require('../services/db');

// Met à jour les stats de la race selon le vote
async function voteOnBreed({ animal_id, voteType, user_id }) {
  const animalRes = await db.query('SELECT breed_id, breed_name, animal_type FROM animals WHERE id = $1', [animal_id]);
  if (!animalRes.rows.length) throw new Error('Animal inconnu');
  const { breed_id, breed_name, animal_type } = animalRes.rows[0];

  const statRes = await db.query(
    'SELECT id FROM breed_stats WHERE breed_id = $1 AND animal_type = $2',
    [breed_id, animal_type]
  );
  if (!statRes.rows.length) {
    await db.query(
      'INSERT INTO breed_stats (breed_id, breed_name, animal_type, total_votes, upvotes, downvotes) VALUES ($1, $2, $3, 1, $4, $5)',
      [breed_id, breed_name, animal_type, voteType === 'like' ? 1 : 0, voteType === 'dislike' ? 1 : 0]
    );
  } else {
    await db.query(
      `UPDATE breed_stats
       SET total_votes = total_votes + 1,
           upvotes = upvotes + $1,
           downvotes = downvotes + $2,
           updated_at = CURRENT_TIMESTAMP
       WHERE breed_id = $3 AND animal_type = $4`,
      [voteType === 'like' ? 1 : 0, voteType === 'dislike' ? 1 : 0, breed_id, animal_type]
    );
  }
}

module.exports = { voteOnBreed };
