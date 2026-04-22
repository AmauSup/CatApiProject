import PropTypes from 'prop-types';
import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ breeds, onSearch, loading }) {
  const [breedId, setBreedId] = useState('');
  const [limit, setLimit] = useState(10);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({
      breedId,
      limit
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-field">
        <span>Race</span>
        <select value={breedId} onChange={(e) => setBreedId(e.target.value)}>
          <option value="">Toutes les races</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
      </label>



      <label className="search-field">
        <span>Nombre de résultats</span>
        <input
          type="number"
          min="1"
          max="25"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value) || 1)}
        />
      </label>

      <button className="search-button" type="submit" disabled={loading}>
        {loading ? 'Recherche...' : 'Rechercher'}
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  breeds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default SearchForm;
