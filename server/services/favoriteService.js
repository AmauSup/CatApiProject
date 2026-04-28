const db = require('./db');

/**
 * Ajoute un favori pour un utilisateur
 * @param {Object} params
 * @param {number} params.user_id
 * @param {number} params.animal_id
 */
async function addFavorite({ user_id, animal_id }) {
  await db.query(
    'INSERT INTO favorites (user_id, animal_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [user_id, animal_id]
  );
}

/**
 * Supprime un favori pour un utilisateur
 * @param {Object} params
 * @param {number} params.user_id
 * @param {number} params.animal_id
 */
async function removeFavorite({ user_id, animal_id }) {
  await db.query(
    'DELETE FROM favorites WHERE user_id = $1 AND animal_id = $2',
    [user_id, animal_id]
  );
}

/**
 * Récupère les favoris d’un utilisateur
 * @param {number} user_id
 * @returns {Promise<Array>}
 */
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
