const { insertAnimal } = require('../services/animalService');

async function insertAnimalHandler(req, res) {
  try {
    console.log('Reçu du frontend :', req.body);
    await insertAnimal(req.body);
    res.status(201).json({ message: 'Animal ajouté' });
  } catch (err) {
    console.error('Erreur insertAnimalHandler:', err);
    res.status(500).json({ message: 'Erreur lors de l\'insertion' });
  }
}

module.exports = { insertAnimalHandler };