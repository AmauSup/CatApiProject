const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const catRoutes = require('./routes/catRoutes');
const voteRoutes = require('./routes/voteRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middlewares/auth');

// Connexion à la base de données PostgreSQL (Neon)
const db = require('./services/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/cats', catRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/votes', auth, voteRoutes);
app.use('/api/favorites', auth, favoriteRoutes);

// Middleware global d'erreur simple pour centraliser les retours d'erreur.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Erreur serveur' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
