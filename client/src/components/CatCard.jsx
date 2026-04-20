import PropTypes from 'prop-types';
import './CatCard.css';

function CatCard({ cat }) {
  const breed = cat?.breeds?.[0];

  return (
    <article className="cat-card">
      <div className="cat-card-image-wrapper">
        <img
          className="cat-card-image"
          src={cat.url}
          alt={breed?.name ? `Chat race ${breed.name}` : 'Image de chat'}
          loading="lazy"
        />
      </div>

      <div className="cat-card-body">
        <p className="cat-card-line">
          <strong>ID:</strong> {cat.id}
        </p>

        {breed ? (
          <>
            <p className="cat-card-line">
              <strong>Race:</strong> {breed.name}
            </p>
            {breed.temperament && (
              <p className="cat-card-line">
                <strong>Tempérament:</strong> {breed.temperament}
              </p>
            )}
            {breed.origin && (
              <p className="cat-card-line">
                <strong>Origine:</strong> {breed.origin}
              </p>
            )}
          </>
        ) : (
          <p className="cat-card-line">Aucune info de race disponible.</p>
        )}
      </div>
    </article>
  );
}

CatCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    breeds: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        temperament: PropTypes.string,
        origin: PropTypes.string
      })
    )
  }).isRequired
};

export default CatCard;
