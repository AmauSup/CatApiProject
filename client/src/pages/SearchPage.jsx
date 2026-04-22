import { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
import SearchForm from '../components/SearchForm';
import {
  getBreeds,
  getCategories,
  searchCats
} from '../services/catService';
import './SearchPage.css';

function SearchPage() {
  const [breeds, setBreeds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoadingFormData(true);
        setError('');

        const [breedsData, categoriesData] = await Promise.all([
          getBreeds(),
          getCategories()
        ]);

        setBreeds(breedsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Impossible de charger les filtres.');
      } finally {
        setLoadingFormData(false);
      }
    };

    loadFilters();
  }, []);

  const handleSearch = async (filters) => {
    try {
      setLoadingSearch(true);
      setError('');
      setHasSearched(true);
      const data = await searchCats(filters);
      // Adapter chaque chat pour avoir une propriété image et name (race)
      const resultsWithImageAndName = data.map(cat => {
        // La race est dans cat.breeds[0]?.name si présent
        let name = '';
        if (cat.breeds && cat.breeds.length > 0) {
          name = cat.breeds[0].name;
        }
        return {
          ...cat,
          image: cat.url || cat.image || '',
          name,
        };
      });
      setResults(resultsWithImageAndName);
    } catch (err) {
      setError(err.message || 'Erreur pendant la recherche.');
      setResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <section>
      <h2 className="page-title">Recherche</h2>

      {loadingFormData ? (
        <p className="message">Chargement des filtres...</p>
      ) : (
        <SearchForm
          breeds={breeds}
          categories={categories}
          onSearch={handleSearch}
          loading={loadingSearch}
        />
      )}

      {error && <p className="message error">{error}</p>}

      {!loadingSearch && !hasSearched && !error && (
        <p className="message">Lancez une recherche pour voir des résultats.</p>
      )}

      {!loadingSearch && results.length > 0 && (
        <div className="cat-grid search-results">
          {results.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}

      {!loadingSearch && hasSearched && results.length === 0 && !error && (
        <p className="search-tip">Aucun résultat pour ces filtres.</p>
      )}
    </section>
  );
}

export default SearchPage;
