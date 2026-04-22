const db = require('./db');

/**
 * Ajoute un animal dans la table animals si non existant (api_id + animal_type unique)
 */
async function insertAnimal(cat) {
  console.log('insertAnimal appelé avec :', cat);
  const imageUrl = cat.url || cat.image;
  if (!cat?.id || !imageUrl) {
    console.log('Animal ignoré (pas d\'id ou d\'url)');
    return;
  }
  // Supporte breed depuis cat.breed (objet) ou cat.breeds[0]
  const breed = cat.breed || (cat.breeds?.[0]) || {};
  try {
    await db.query(
      `INSERT INTO animals (api_id, animal_type, breed_id, breed_name, image_url, weight_metric, life_span, temperament)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (api_id, animal_type) DO NOTHING`,
      [
        cat.id,
        'cat',
        breed.id || null,
        breed.name || null,
        imageUrl,
        breed.weight?.metric || null,
        breed.life_span || null,
        breed.temperament || null
      ]
    );
  } catch (err) {
    console.error('Erreur insertion animal:', err);
  }
}

module.exports = { insertAnimal };