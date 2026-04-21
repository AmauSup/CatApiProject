import { useEffect, useState } from "react";
import CatCard from "../components/CatCard";
import likeIcon from "../assets/like-icon.png";
import dislikeIcon from "../assets/dislike-icon.png";
import nextIcon from "../assets/next-icon.png";
import "./HomePage.css";

function HomePage() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const loadRandomCat = async () => {
    try {
      setLoading(true);
      setError("");

      // 1. récupérer toutes les races
      const resBreeds = await fetch("https://api.thecatapi.com/v1/breeds");
      const breeds = await resBreeds.json();

      // 2. choisir une race aléatoire
      const breed =
        breeds[Math.floor(Math.random() * breeds.length)];

      // 3. récupérer une image liée
      const imgRes = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`
      );
      const imgData = await imgRes.json();

      // 4. créer un objet propre
      const catProfile = {
        id: breed.id,
        name: breed.name,
        origin: breed.origin,
        temperament: breed.temperament,
        lifeSpan: breed.life_span,
        weight: breed.weight.metric,
        image: imgData[0]?.url || "",
      };

      setCat(catProfile);
    } catch (err) {
      setError("Impossible de charger les chats.");
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

      {!loading && !error && cat && (
        <div className="home-card-wrapper">
          <CatCard cat={cat} />

          <div className="home-actions">
            <button className="like-button" onClick={handleLike}>
              <img src={likeIcon} alt="Like" className="button-icon" />
              <span>Like</span>
            </button>

            <button className="dislike-button" onClick={handleDislike}>
              <img src={dislikeIcon} alt="Dislike" className="button-icon" />
              <span>Dislike</span>
            </button>

            <button className="next-button" onClick={handleNext}>
              <img src={nextIcon} alt="Next" className="button-icon" />
              <span>Next</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomePage;