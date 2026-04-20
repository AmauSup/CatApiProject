const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const catRoutes = require('./routes/catRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/cats', catRoutes);

// Middleware global d'erreur simple pour centraliser les retours d'erreur.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Erreur serveur' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
