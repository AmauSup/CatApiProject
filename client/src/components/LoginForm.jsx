// import { useContext, useState } from 'react';
// import { AuthContext } from '../services/AuthContext';

// export default function LoginForm() {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const res = await fetch('http://localhost:5050/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Erreur');
//       login(data.user, data.token);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Connexion</h2>
//       <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required />
//       <button type="submit">Se connecter</button>
//       {error && <div style={{color:'red'}}>{error}</div>}
//     </form>
//   );
// }


import { useContext, useState } from 'react';
import { AuthContext } from '../services/AuthContext';
import './AuthForm.css';

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur de connexion');

      login(data.user, data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Connexion</h2>
        <p className="auth-subtitle">Connecte-toi à ton compte</p>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Entre ton mot de passe"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Se connecter
          </button>

          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}