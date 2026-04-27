import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import './AuthForm.css';

export default function SignupForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5050/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur d'inscription");
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Créer un compte</h2>
        <p className="auth-subtitle">Inscris-toi pour commencer</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-group">
            <label className="auth-label">Nom d'utilisateur</label>
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entre ton nom d'utilisateur"
              required
            />
          </div>

          <div className="auth-group">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entre ton email"
              required
            />
          </div>

          <div className="auth-group">
            <label className="auth-label">Mot de passe</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crée un mot de passe"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            S'inscrire
          </button>

          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
