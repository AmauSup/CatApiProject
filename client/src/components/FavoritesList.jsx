import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

export default function FavoritesList() {
    const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  // Rafraîchit la liste après suppression
  const fetchFavorites = () => {
    if (!user) return;
    fetch('http://localhost:5050/api/favorites', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(() => setError('Erreur chargement favoris'));
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line
  }, [user]);

  const handleRemove = async (cat) => {
    setError('');
    try {
      const res = await fetch('http://localhost:5050/api/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ animal_id: cat.id })
      });
      if (!res.ok) throw new Error('Erreur suppression favori');
      fetchFavorites();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!user) return <div>Connecte-toi pour voir tes favoris.</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Mes favoris</h2>
      {favorites.length === 0 ? (
        <p>Aucun favori.</p>
      ) : (
        <ul style={{padding:0}}>
          {favorites.map(cat => (
            <li key={cat.id} style={{marginBottom:16,display:'flex',alignItems:'center',cursor:'pointer',background:'#f7f7ff',borderRadius:10,padding:'8px 8px 8px 0'}} onClick={() => navigate(`/cats/${cat.id}`)}>
              <img src={cat.image_url} alt={cat.breed_name || 'Chat'} width={80} style={{verticalAlign:'middle',borderRadius:8}} />
              <div style={{marginLeft:12,flex:1}}>
                <div><strong>{cat.breed_name || 'Chat'}</strong></div>
                <div style={{fontSize:'0.95em',color:'#555'}}>
                  {cat.temperament && <span><b>Tempérament:</b> {cat.temperament} <br/></span>}
                  {cat.origin && <span><b>Origine:</b> {cat.origin} <br/></span>}
                  {cat.life_span && <span><b>Espérance de vie:</b> {cat.life_span} ans <br/></span>}
                  {cat.weight_metric && <span><b>Poids:</b> {cat.weight_metric} kg</span>}
                </div>
              </div>
              <button className="remove-favorite-btn" onClick={e => {e.stopPropagation(); handleRemove(cat);}} style={{marginLeft:16}}>Retirer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
