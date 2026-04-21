import { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
import FavoriteButton from '../components/FavoriteButton';
import './HomePage.css';

function HomePage() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const loadRandomCat = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1');
      const data = await res.json();

      const catData = data[0] || null;
      setCat(catData);

      // Envoi au backend pour insertion dans la BDD
      if (catData) {
        fetch('http://localhost:5000/api/cats/animals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(catData)
        });
      }
    } catch (err) {
      setError('Impossible de charger les chats.');
      setCat(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomCat();
  }, []);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    loadRandomCat();
  };

  const handleDislike = () => {
    setDislikes((prev) => prev + 1);
    loadRandomCat();
  };

  const handleNext = () => {
    loadRandomCat();
  };

  return (
    <section className="home-page">
      <h2 className="page-title">Accueil</h2>

      <p className="home-subtitle">
        Découvre un chat, aime-le, refuse-le ou passe au suivant.
      </p>

      <div className="home-stats">
        <span>👍 Likes : {likes}</span>
        <span>👎 Dislikes : {dislikes}</span>
      </div>

      {error && <p className="message error">{error}</p>}

      {loading && <p className="message">Chargement...</p>}

      {!loading && !error && !cat && (
        <p className="message">Aucune image trouvée.</p>
      )}

      {!loading && !error && cat && (
        <div className="home-card-wrapper">
          <CatCard cat={cat} />
          <div className="home-actions">
            <button className="action-button like-button" onClick={handleLike}>
              👍 Like
            </button>
            <button className="action-button dislike-button" onClick={handleDislike}>
              👎 Dislike
            </button>
            <button className="action-button next-button" onClick={handleNext}>
              ⏭ Suivant
            </button>
            {cat.id && <FavoriteButton animalId={cat.id} />}
          </div>
        </div>
      )}
    </section>
  );
}

export default HomePage;