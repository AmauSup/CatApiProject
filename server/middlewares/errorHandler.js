module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Erreur serveur'
    : err.message || 'Erreur inconnue';
  res.status(status).json({ success: false, message });
};
