import PropTypes from "prop-types";
import "./CatCard.css";

function CatCard({ cat }) {
  if (!cat) return null;

  const formatLifeSpan = (lifeSpan) => {
    if (!lifeSpan) return "";

    const parts = lifeSpan.split(" - ").map(Number);

    if (parts.length === 2) {
      const [min, max] = parts;
      return `${min} - ${max} ans`;
    }

    return `${lifeSpan} ans`;
  };

  return (
    <article className="cat-card">
      <img
        className="cat-card-image"
        src={cat.image}
        alt={cat.name}
        loading="lazy"
      />

      <div className="cat-card-overlay">
        <h2>Race : {cat.name}</h2>
      </div>
    </article>
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
};

export default CatCard;