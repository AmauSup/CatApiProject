require('events').EventEmitter.defaultMaxListeners = 30;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const catRoutes = require('./routes/catRoutes');
const voteRoutes = require('./routes/voteRoutes');
const breedStatsRoutes = require('./routes/breedStatsRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes');
const tournoiRoutes = require('./routes/tournoiRoutes');
const auth = require('./middlewares/auth');

// Connexion à la base de données PostgreSQL (Neon)
const db = require('./services/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(
	cors({
		// origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    origin: [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176'
],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
		exposedHeaders: ['Content-Type', 'Authorization'],
	}),
);
app.use(express.json());

app.get('/api/health', (req, res) => {
	res.json({ message: 'API is running' });
});

app.use('/api/cats', catRoutes);
app.use('/api/cats', breedStatsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/favorites', auth, favoriteRoutes);

app.use('/api/tournoi', tournoiRoutes);

// Middleware global d'erreur simple pour centraliser les retours d'erreur.
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({
		message: err.message || 'Erreur serveur',
	});
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
