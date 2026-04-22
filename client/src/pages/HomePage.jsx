import FavoriteButton from '../components/FavoriteButton';
import './HomePage.css';

import { useEffect, useState } from "react";
import CatCard from "../components/CatCard";
import likeIcon from "../assets/like-icon.png";
import dislikeIcon from "../assets/dislike-icon.png";
import nextIcon from "../assets/next-icon.png";
import { voteOnCat } from '../services/voteService';
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
      const breed = breeds[Math.floor(Math.random() * breeds.length)];

      // 3. récupérer une image liée
      const imgRes = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`
      );
      const imgData = await imgRes.json();

      // 4. créer un objet propre avec id d'image
      const catProfile = {
        id: imgData[0]?.id, // id d'image unique
        image: imgData[0]?.url || "",
        name: breed.name,
        origin: breed.origin,
        temperament: breed.temperament,
        lifeSpan: breed.life_span,
        weight: breed.weight.metric,
        breed: breed // pour la page détail
      };

      setCat(catProfile);

      // Envoi au backend pour insertion dans la BDD
      fetch('http://localhost:5000/api/cats/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catProfile)
      });
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

  const handleLike = async () => {
    setLikes((prev) => prev + 1);
    if (cat && cat.id) {
      try {
        await voteOnCat({ animalId: cat.id, voteType: 'like' });
      } catch (e) {}
    }
    loadRandomCat();
  };

  const handleDislike = async () => {
    setDislikes((prev) => prev + 1);
    if (cat && cat.id) {
      try {
        await voteOnCat({ animalId: cat.id, voteType: 'dislike' });
      } catch (e) {}
    }
    loadRandomCat();
  };

  const handleNext = async () => {
    if (cat && cat.id) {
      try {
        await voteOnCat({ animalId: cat.id, voteType: 'skip' });
      } catch (e) {}
    }
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
            {cat.id && <FavoriteButton animalId={cat.id} />}
          </div>
        </div>
      )}
    </section>
  );
}

export default HomePage;