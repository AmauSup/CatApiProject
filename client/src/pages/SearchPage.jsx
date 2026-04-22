import { useEffect, useState, useRef } from 'react';

// Fonction utilitaire pour garantir l'unicité des chats par id
function mergeUniqueCats(existing, incoming) {
  const map = new Map();
  [...existing, ...incoming].forEach(cat => {
    map.set(cat.id, cat);
  });
  return Array.from(map.values());
}
import CatCard from '../components/CatCard';
import SearchForm from '../components/SearchForm';
import {
  getBreeds,
  searchCats
} from '../services/catService';
import './SearchPage.css';

import { useLocation } from 'react-router-dom';

function SearchPage() {
  const location = useLocation();
  const [breeds, setBreeds] = useState([]);
  // ...
  const [results, setResults] = useState([]);
  // ...
  const [loadingFormData, setLoadingFormData] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [noMoreNewCats, setNoMoreNewCats] = useState(false);
  const lastFilters = useRef(null); // Pour reroll


  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoadingFormData(true);
        setError('');

        const breedsData = await getBreeds();
        setBreeds(breedsData);
      } catch (err) {
        setError(err.message || 'Impossible de charger les filtres.');
      } finally {
        setLoadingFormData(false);
      }
    };

    loadFilters();
  }, []);

  // Si on arrive depuis la page détail avec des filtres, relance la recherche
  useEffect(() => {
    if (location.state?.filters) {
      handleSearch(location.state.filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);



  // Recherche avec garantie d'unicité et du nombre demandé

  const handleSearch = async (filters, excludeIds = []) => {
    try {
      setLoadingSearch(true);
      setError('');
      setHasSearched(true);
      setNoMoreNewCats(false);
      lastFilters.current = filters;
      let uniqueCats = [];
      let tries = 0;
      const wanted = Number(filters.limit) || 25;
      const maxTries = 8;
      let lastGoodCats = [];
      while (uniqueCats.length < wanted && tries < maxTries) {
        let data = [];
        try {
          data = await searchCats({ ...filters, excludeIds: [...excludeIds, ...uniqueCats.map(c => c.id)] });
        } catch (err) {
          // Si 404, plus de chats à afficher
          if (err.response?.status === 404) {
            break;
          } else {
            throw err;
          }
        }
        const resultsWithImageAndName = data.map(cat => {
          let name = '';
          if (cat.breeds && cat.breeds.length > 0) {
            name = cat.breeds[0].name;
          }
          return {
            ...cat,
            id: cat.id, // id d'image unique
            image: cat.url || cat.image || '',
            name,
            breed: cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null
          };
        });
        uniqueCats = mergeUniqueCats(uniqueCats, resultsWithImageAndName);
        lastGoodCats = resultsWithImageAndName.length > 0 ? resultsWithImageAndName : lastGoodCats;
        tries++;
      }
      if (uniqueCats.length === 0 && lastGoodCats.length > 0) {
        setResults(lastGoodCats);
        setNoMoreNewCats(true);
      } else if (uniqueCats.length < wanted) {
        setResults(uniqueCats);
        setNoMoreNewCats(true);
        setOldResults(uniqueCats);
      } else {
        setResults(uniqueCats.slice(0, wanted));
        setOldResults(uniqueCats.slice(0, wanted));
      }
    } catch (err) {
      setError(err.message || 'Erreur pendant la recherche.');
      setResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  // Reroll : relance la recherche avec les mêmes filtres
  const handleReroll = () => {
    if (lastFilters.current) {
      // Exclure tous les chats déjà affichés
      handleSearch(lastFilters.current, results.map(c => c.id));
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
          onSearch={handleSearch}
          loading={loadingSearch}
        />
      )}

      {error && <p className="message error">{error}</p>}

      {!loadingSearch && !hasSearched && !error && (
        <p className="message">Lancez une recherche pour voir des résultats.</p>
      )}

      {!loadingSearch && results.length > 0 && (
        <>
          <button
            className="reroll-btn"
            onClick={handleReroll}
            style={{ marginBottom: '1rem' }}
            disabled={noMoreNewCats}
          >
            🔄 Voir d'autres chats
          </button>
          {noMoreNewCats && (
            <p className="message info" style={{ color: '#888', marginBottom: '1rem' }}>
              Plus de nouveaux chats à afficher pour cette recherche.<br />
              Les derniers chats affichés sont à nouveau proposés.
            </p>
          )}
          <div className="cat-grid search-results">
            {results.map((cat) => (
              <CatCard key={cat.id} cat={cat} filters={lastFilters.current} />
            ))}
          </div>
        </>
      )}

      {!loadingSearch && hasSearched && results.length === 0 && !error && (
        <p className="search-tip">Aucun résultat pour ces filtres.</p>
      )}
    </section>
  );
}

export default SearchPage;
