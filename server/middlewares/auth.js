const jwt = require('jsonwebtoken');

/**
 * Middleware d’authentification JWT
 * Vérifie le token dans l’en-tête Authorization
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Non authentifié' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré' });
    }
    res.status(401).json({ message: 'Token invalide' });
  }
}
module.exports = authMiddleware;
