const { voteOnBreed } = require('../services/voteService');

exports.vote = async (req, res) => {
  const { animal_id, voteType } = req.body;
  const user_id = 1; // à remplacer par req.user.id après auth
  if (!animal_id || !['like', 'dislike', 'skip'].includes(voteType)) {
    return res.status(400).json({ message: 'Requête invalide' });
  }
  if (voteType === 'skip') return res.json({ message: 'Image passée' });
  try {
    await voteOnBreed({ animal_id, voteType, user_id });
    res.json({ message: 'Vote enregistré' });
  } catch (err) {
  console.error('Erreur vote:', err); // Ajout du log détaillé
  res.status(500).json({ message: err.message });
}
};
