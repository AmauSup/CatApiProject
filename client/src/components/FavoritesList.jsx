import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../services/AuthContext';

export default function FavoritesList() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    fetch('http://localhost:5000/api/favorites', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(() => setError('Erreur chargement favoris'));
  }, [user]);

  if (!user) return <div>Connecte-toi pour voir tes favoris.</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Mes favoris</h2>
      {favorites.length === 0 ? (
        <p>Aucun favori.</p>
      ) : (
        <ul>
          {favorites.map(cat => (
            <li key={cat.id}>
              <img src={cat.image_url} alt={cat.breed_name || 'Chat'} width={80} style={{verticalAlign:'middle'}} />
              <span style={{marginLeft:8}}>{cat.breed_name || 'Chat'} (ID: {cat.id})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
