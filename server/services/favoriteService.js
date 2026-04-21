const db = require('./db');

async function addFavorite({ user_id, animal_id }) {
  await db.query(
    'INSERT INTO favorites (user_id, animal_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [user_id, animal_id]
  );
}

async function removeFavorite({ user_id, animal_id }) {
  await db.query(
    'DELETE FROM favorites WHERE user_id = $1 AND animal_id = $2',
    [user_id, animal_id]
  );
}

async function getFavorites(user_id) {
  const res = await db.query(
    `SELECT animals.* FROM favorites
     JOIN animals ON favorites.animal_id = animals.id
     WHERE favorites.user_id = $1`,
    [user_id]
  );
  return res.rows;
}

module.exports = { addFavorite, removeFavorite, getFavorites };
