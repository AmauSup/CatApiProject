
require('dotenv').config({ path: __dirname + '/.env' });
const db = require('./services/db');

async function testSelectAnimals() {
  try {
    const res = await db.query('SELECT * FROM animals ORDER BY id DESC LIMIT 5');
    console.log('Derniers animaux en base:', res.rows);
    process.exit(0);
  } catch (err) {
    console.error('Erreur SELECT animals:', err);
    process.exit(1);
  }
}

testSelectAnimals();
