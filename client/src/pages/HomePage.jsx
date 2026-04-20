import { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
import { getRandomCats } from '../services/catService';
import './HomePage.css';

function HomePage() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRandomCats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getRandomCats(8);
      setCats(data);
    } catch (err) {
      setError(err.message || 'Impossible de charger les chats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomCats();
  }, []);

  return (
    <section>
      <h2 className="page-title">Accueil</h2>

      <div className="home-actions">
        <button className="reload-button" onClick={loadRandomCats} disabled={loading}>
          {loading ? 'Chargement...' : 'Recharger'}
        </button>
      </div>

      {error && <p className="message error">{error}</p>}

      {!loading && !error && cats.length === 0 && (
        <p className="message">Aucune image trouvée.</p>
      )}

      <div className="cat-grid">
        {cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
