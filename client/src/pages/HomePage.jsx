import { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
import likeIcon from '../assets/like-icon.png';
import dislikeIcon from '../assets/dislike-icon.png';
import nextIcon from '../assets/next-icon.png';
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

      setCat(data[0] || null);
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

      {error && <p className="message error">{error}</p>}

      {loading && <p className="message">Chargement...</p>}

      {!loading && !error && !cat && (
        <p className="message">Aucune image trouvée.</p>
      )}

      {!loading && !error && cat && (
        <div className="home-card-wrapper">
          <CatCard cat={cat} />

          <div className="home-actions">
            <button className="like-button" onClick={handleLike} title="J'aime">
              <img src={likeIcon} alt="Like" className="button-icon" />
              <span className="button-text">J'aime</span>
            </button>

            <button className="dislike-button" onClick={handleDislike} title="Je n'aime pas">
              <img src={dislikeIcon} alt="Dislike" className="button-icon" />
              <span className="button-text">Pas mal</span>
            </button>

            <button className="next-button" onClick={handleNext} title="Voir le suivant">
              <img src={nextIcon} alt="Suivant" className="button-icon" />
              <span className="button-text">Suivant</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomePage;