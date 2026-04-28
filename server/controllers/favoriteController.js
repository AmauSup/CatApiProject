// NOTE : Les réponses API ne suivent pas partout le format { success, message, data } pour ne pas casser le frontend existant.
// Pour toute évolution, il est recommandé d’utiliser ce format pour plus de clarté et de cohérence.
const { addFavorite, removeFavorite, getFavorites } = require('../services/favoriteService');

/**
 * Ajoute un animal aux favoris de l’utilisateur connecté
 * @route POST /api/favorites
 * @param {Request} req
 * @param {Response} res
 */
exports.add = async (req, res) => {
  const user_id = req.user?.id;
  const { animal_id } = req.body;
  if (!user_id || !animal_id) return res.status(400).json({ message: 'Données manquantes' });
  try {
    await addFavorite({ user_id, animal_id });
    res.json({ message: 'Ajouté aux favoris' });
  } catch (err) {
    console.error('Erreur ajout favori:', err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Retire un animal des favoris de l’utilisateur connecté
 * @route DELETE /api/favorites
 * @param {Request} req
 * @param {Response} res
 */
exports.remove = async (req, res) => {
  const user_id = req.user?.id;
  const { animal_id } = req.body;
  if (!user_id || !animal_id) return res.status(400).json({ message: 'Données manquantes' });
  try {
    await removeFavorite({ user_id, animal_id });
    res.json({ message: 'Retiré des favoris' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Liste les favoris de l’utilisateur connecté
 * @route GET /api/favorites
 * @param {Request} req
 * @param {Response} res
 */
exports.list = async (req, res) => {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'Non authentifié' });
  try {
    const favs = await getFavorites(user_id);
    res.json(favs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
