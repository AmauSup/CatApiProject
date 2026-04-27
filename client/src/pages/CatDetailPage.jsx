import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getCatById } from '../services/catService';
import { voteOnCat } from '../services/voteService';
import FavoriteButton from '../components/FavoriteButton';
import likeIcon from '../assets/like-icon.png';
import dislikeIcon from '../assets/dislike-icon.png';
import nextIcon from '../assets/next-icon.png';
import './CatDetailPage.css';

function CatDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  // Récupère la race passée via navigation state (si dispo)
  const breedFromNav = location.state?.breed;

  useEffect(() => {
    async function fetchCat() {
      setLoading(true);
      setError('');
      try {
        const data = await getCatById(id);
        setCat(data);
      } catch (err) {
        setError('Impossible de charger les détails du chat.');
      } finally {
        setLoading(false);
      }
    }
    fetchCat();
  }, [id]);

  // Insère le chat en base si besoin (pour favoris)
  async function ensureCatInDb() {
    if (!cat) return;
    try {
      await fetch('http://localhost:5000/api/cats/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cat.id,
          image: cat.url || cat.image,
          name: breed?.name || '',
          origin: breed?.origin || '',
          temperament: breed?.temperament || '',
          lifeSpan: breed?.life_span || '',
          weight: breed?.weight?.metric || '',
          breed: breed || null
        })
      });
    } catch {}
  }

  // Actions like/dislike/favori
  const handleLike = async () => {
    setActionLoading(true);
    setError('');
    try {
      await ensureCatInDb();
      await voteOnCat({ animalId: cat.id, voteType: 'like' });
      navigate('/', { state: { cat } });
    } catch (e) {
      setError('Erreur lors du vote like.');
    } finally {
      setActionLoading(false);
    }
  };
  const handleDislike = async () => {
    setActionLoading(true);
    setError('');
    try {
      await ensureCatInDb();
      await voteOnCat({ animalId: cat.id, voteType: 'dislike' });
      navigate('/', { state: { cat } });
    } catch (e) {
      setError('Erreur lors du vote dislike.');
    } finally {
      setActionLoading(false);
    }
  };
  const handleNext = async () => {
    setActionLoading(true);
    setError('');
    try {
      await ensureCatInDb();
      await voteOnCat({ animalId: cat.id, voteType: 'skip' });
      navigate('/', { state: { cat } });
    } catch (e) {
      setError('Erreur lors du passage au chat suivant.');
    } finally {
      setActionLoading(false);
    }
  };
  // Flèche retour intelligente
  const handleBack = () => {
    // Si on vient d'une recherche, retourne à la recherche avec les filtres
    if (location.state?.from === 'search') {
      navigate('/search', { state: { filters: location.state?.filters || null } });
    } else if (location.state?.from === 'home') {
      // Si on vient de l'accueil, retourne à l'accueil avec le chat courant
      navigate('/', { state: { cat } });
    } else {
      // Sinon, retour navigateur
      navigate(-1);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!cat) return <p>Chat introuvable.</p>;

  // Utilise la race de l'API image ou celle passée via navigation
  const breed = (cat.breeds && cat.breeds.length > 0) ? cat.breeds[0] : breedFromNav;

  return (
    <div className="cat-detail-page" style={{ position: 'relative' }}>
      {/* Flèche retour */}
      <button className="cat-detail-back" onClick={handleBack} title="Retour">
        ← Retour
      </button>
      <h2>Détail du chat</h2>
      <img src={cat.url || cat.image} alt={breed?.name || cat.id} className="cat-detail-img" />
      <ul className="cat-detail-list">
        <li><strong>ID image:</strong> {cat.id}</li>
        {breed && (
          <>
            <li><strong>Race:</strong> {breed.name}</li>
            <li><strong>Description:</strong> {breed.description}</li>
            <li><strong>Origine:</strong> {breed.origin}</li>
            <li><strong>Tempérament:</strong> {breed.temperament}</li>
          </>
        )}
      </ul>
      <div className="cat-detail-actions">
        <button className="like-button" onClick={handleLike} disabled={actionLoading}>
          <img src={likeIcon} alt="Like" className="button-icon" />
          <span>Like</span>
        </button>
        <button className="dislike-button" onClick={handleDislike} disabled={actionLoading}>
          <img src={dislikeIcon} alt="Dislike" className="button-icon" />
          <span>Dislike</span>
        </button>
        <button className="next-button" onClick={handleNext} disabled={actionLoading}>
          <img src={nextIcon} alt="Next" className="button-icon" />
          <span>Next</span>
        </button>
        {/* Robustesse : n'affiche le bouton favori que si le chat a un id */}
        {cat.id && <FavoriteButton animalId={cat.id} />}
      </div>
    </div>
  );
}

export default CatDetailPage;
