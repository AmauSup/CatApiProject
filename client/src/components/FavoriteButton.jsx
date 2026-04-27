import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../services/AuthContext';
import FullStar from '../assets/full-star-icon.png';
import EmptyStar from '../assets/star-icon.png';
import './FavoriteButton.css';


// animalId doit être l'id d'image (ex: p2U4ZXgKL)
export default function FavoriteButton({ animalId }) {
  const { user } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!error) return undefined;

    const timeoutId = window.setTimeout(() => {
      setError('');
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [error]);
  // Vérifie si déjà favori au chargement
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const resId = await fetch(`http://localhost:5050/api/cats/animal-id?api_id=${animalId}`);
        const dataId = await resId.json();
        if (!resId.ok || !dataId.id) return;
        const numericId = dataId.id;
        const res = await fetch('http://localhost:5050/api/favorites', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (!res.ok) return;
        const favs = await res.json();
        setIsFav(favs.some(fav => fav.id === numericId));
      } catch {}
    })();
  }, [user, animalId]);

  // animalId ici est l'id API (string), il faut trouver l'id numérique
  const handleToggle = async () => {
    setError('');
    if (!user) {
      setError('Connecte-toi pour ajouter aux favoris');
      return;
    }
    try {
      // Récupère l'id numérique de l'animal
      const resId = await fetch(`http://localhost:5050/api/cats/animal-id?api_id=${animalId}`);
      const dataId = await resId.json();
      if (!resId.ok || !dataId.id) throw new Error('Animal non trouvé en base');
      const numericId = dataId.id;
      const res = await fetch('http://localhost:5050/api/favorites', {
        method: isFav ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ animal_id: numericId })
      });
      if (!res.ok) throw new Error('Erreur favoris');
      setIsFav(!isFav);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="favorite-button-wrapper">
      <button
        onClick={handleToggle}
        className={`favorite-button ${isFav ? 'active' : ''}`}
      >
        <img
          src={isFav ? FullStar : EmptyStar}
          alt="favori"
          className="favorite-icon"
        />
        <span className="favorite-text">Favoris</span>
      </button>
      {error && (
        <div className="favorite-toast" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
    </div>
  );
}
