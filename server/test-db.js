
// Script de test de connexion à PostgreSQL (Neon)
require('dotenv').config({ path: __dirname + '/.env' });
console.log('DATABASE_URL =', process.env.DATABASE_URL);
const db = require('./services/db');

async function testConnection() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Connexion réussie ! Heure du serveur :', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
}

testConnection();
