import { useEffect, useState } from "react";
import "./Tournois.css";

function Tournois() {
  const [cat1, setCat1] = useState(null);
  const [cat2, setCat2] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImageDetails = async (imageId) => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/${imageId}`);
    const data = await res.json();
    return data;
  };

  const fetchCats = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=2&has_breeds=1"
      );
      const data = await res.json();
      if (data.length >= 2) {
        const catDetails1 = await fetchImageDetails(data[0].id);
        const catDetails2 = await fetchImageDetails(data[1].id);
        setCat1(catDetails1);
        setCat2(catDetails2);
      }
    } catch (error) {
      console.error("Erreur API :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const formatLifeSpan = (lifeSpan) => {
    if (!lifeSpan) return "";

    const parts = lifeSpan.split(" - ").map(Number);

    if (parts.length === 2) {
      const [min, max] = parts;
      return `${min} - ${max} ans`;
    }

    return `${lifeSpan} ans`;
  };

  const getBreedInfo = (cat) => {
    const breed = cat?.breeds?.[0];

    return {
      name: breed?.name || "",
      weight: breed?.weight?.metric || "",
      lifeSpan: formatLifeSpan(breed?.life_span),
      temperament: breed?.temperament || "",
    };
  };

  const breed1 = getBreedInfo(cat1);
  const breed2 = getBreedInfo(cat2);

  return (
    <div className="tournoi-page">
      <h1 className="tournoi-title">Quel chat gagne le 1v1 ?</h1>
      <p className="tournoi-subtitle">Choisis le plus mignon 😍</p>

      {loading ? (
        <p className="tournoi-loading">Chargement...</p>
      ) : (
        <>
          <div className="tournoi-wrapper">
            <div className="cat-card left-card">
              {cat1 && (
                <>
                  <img src={cat1.url} alt={breed1.name || "chat 1"} className="cat-image" />

                  <div className="cat-overlay left-overlay">
                    <h2>Race : {breed1.name}</h2>
                    <p><strong>Poids :</strong> {breed1.weight} kg </p>
                    <p><strong>Durée de vie :</strong> {breed1.lifeSpan}</p>
                    <p><strong>Tempérament :</strong> {breed1.temperament}</p>
                  </div>

                  <button className="choose-btn left-btn" onClick={fetchCats}>
                    Choisir ce chat
                  </button>
                </>
              )}
            </div>

            <div className="vs-circle">VS</div>

            <div className="cat-card right-card">
              {cat2 && (
                <>
                  <img src={cat2.url} alt={breed2.name || "chat 2"} className="cat-image" />

                  <div className="cat-overlay right-overlay">
                    <h2>Race : {breed2.name}</h2>
                    <p><strong>Poids :</strong> {breed2.weight} kg </p>
                    <p><strong>Durée de vie :</strong> {breed2.lifeSpan}</p>
                    <p><strong>Tempérament :</strong> {breed2.temperament}</p>
                  </div>

                  <button className="choose-btn right-btn" onClick={fetchCats}>
                    Choisir ce chat
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="next-round">
            <button className="next-btn" onClick={fetchCats}>
              Nouveau duel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Tournois;