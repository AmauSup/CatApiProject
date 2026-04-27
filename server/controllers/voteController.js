// NOTE : Les réponses API ne suivent pas partout le format { success, message, data } pour ne pas casser le frontend existant.
// Pour toute évolution, il est recommandé d’utiliser ce format pour plus de clarté et de cohérence.
const { voteOnBreed } = require('../services/voteService');

exports.vote = async (req, res) => {
  const { animal_id, voteType } = req.body;
  const user_id = 1; // à remplacer par req.user.id après auth
  if (!animal_id || !['like', 'dislike', 'skip'].includes(voteType)) {
    return res.status(400).json({ message: 'Requête invalide' });
  }
  try {
    await voteOnBreed({ animal_id, voteType, user_id });
    res.json({ message: voteType === 'skip' ? 'Vote blanc enregistré' : 'Vote enregistré' });
  } catch (err) {
    console.error('Erreur vote:', err); // Ajout du log détaillé
    res.status(500).json({ message: err.message });
  }
};
