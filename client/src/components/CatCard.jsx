import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import "./CatCard.css";


function CatCard({ cat, from, filters }) {
  const navigate = useNavigate();
  if (!cat) return null;

  // ...

  const handleClick = () => {
    navigate(`/cat/${cat.id}`, {
      state: {
        breed: cat.breed,
        from: from || (globalThis.location.pathname === '/search' ? 'search' : 'home'),
        filters: filters || null,
      },
    });
  };

  return (
    <button
      className="cat-card"
      style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
      onClick={handleClick}
      tabIndex={0}
      aria-label={`Voir le détail du chat ${cat.name}`}
    >
      <img
        className="cat-card-image"
        src={cat.image}
        alt={cat.name}
        loading="lazy"
      />
      <div className="cat-card-overlay">
        <h2>Race : {cat.name}</h2>
      </div>
    </button>
  );
}

CatCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    origin: PropTypes.string,
    temperament: PropTypes.string,
    lifeSpan: PropTypes.string,
    weight: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  from: PropTypes.string,
  filters: PropTypes.object,
};

export default CatCard;