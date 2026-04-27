import { useEffect, useState } from "react";
import tournoiService from "../services/tournoiService";
import "./Tournois.css";

// Liste des races (id)
const ALL_BREEDS = [
  "abys","aege","abob","acur","asho","awir","amau","amis","bali","bamb","beng","birm","bomb","bslo","bsho","bure","buri","cspa","ctif","char","chau","chee","csho","crex","cymr","cypr","drex","dons","lihu","emau","ebur","esho","hbro","hima","jbob","java","khao","kora","kuri","lape","mcoo","mala","manx","munc","nebe","norw","ocic","orie","pers","pixi","raga","ragd","rblu","sava","sfol","srex","siam","sibe","sing","snow","soma","sphy","tonk","toyg","tang","tvan","ycho"
];

function Tournois() {
  const [tournoi, setTournoi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voted, setVoted] = useState(false);
  const [showBracket, setShowBracket] = useState(false);
  const [bracket, setBracket] = useState([]);

  // Tournoi normal (8 races aléatoires)
  const handleStart = async () => {
    setLoading(true);
    setError("");
    setVoted(false);
    setShowBracket(false);
    try {
      const data = await tournoiService.startTournoi();
      setTournoi(data);
    } catch (e) {
      setError("Erreur lors du lancement du tournoi");
    } finally {
      setLoading(false);
    }
  };

  // Tournoi toutes les races
  const handleStartAllBreeds = async () => {
    setLoading(true);
    setError("");
    setVoted(false);
    setShowBracket(false);
    try {
      const data = await tournoiService.startTournoi(ALL_BREEDS);
      setTournoi(data);
    } catch (e) {
      setError("Erreur lors du lancement du tournoi toutes races");
    } finally {
      setLoading(false);
    }
  };

  // Récupère l'état du tournoi
  const fetchTournoi = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await tournoiService.getTournoi();
      setTournoi(data);
    } catch (e) {
      setError("Erreur lors de la récupération du tournoi");
    } finally {
      setLoading(false);
    }
  };

  // Vote pour un chat dans le match courant
  const handleVote = async (matchId, winnerId) => {
    setLoading(true);
    setError("");
    try {
      await tournoiService.voteMatch(matchId, winnerId);
      setVoted(true);
      await fetchTournoi();
    } catch (e) {
      setError("Erreur lors du vote");
    } finally {
      setLoading(false);
    }
  };

  // Affiche l'arborescence du tournoi
  const handleShowBracket = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await tournoiService.getBracket();
      setBracket(data);
      setShowBracket(true);
    } catch (e) {
      setError("Erreur lors de la récupération de l'arborescence");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournoi();
    // eslint-disable-next-line
  }, []);

  // Trouve le match courant (non joué) du round actuel
  const getCurrentMatch = () => {
    if (!tournoi || !tournoi.rounds) return null;
    const round = tournoi.rounds[tournoi.currentRound];
    if (!round) return null;
    return round.matches.find((m) => !m.winner);
  };

  const currentMatch = getCurrentMatch();

  // Réinitialise voted à false à chaque nouveau match
  useEffect(() => {
    setVoted(false);
  }, [tournoi?.currentRound, currentMatch?.id]);
  const roundName = tournoi?.rounds?.[tournoi?.currentRound]?.name;
  const currentRoundNumber = tournoi && tournoi.rounds ? (tournoi.currentRound + 1) : 0;
  // Calcul correct du nombre total de rounds à partir du nombre de participants
  const totalRounds = tournoi?.participants ? Math.ceil(Math.log2(tournoi.participants.length)) : 0;

  // Quitter le tournoi : reset et retour accueil
  const handleQuit = async () => {
    setLoading(true);
    try {
      await tournoiService.quitTournoi();
    } catch (e) {}
    setTournoi(null);
    setBracket([]);
    setShowBracket(false);
    setError("");
    setVoted(false);
    setLoading(false);
    // On reste sur la page tournoi, pas de navigation automatique
  };

  return (
    <div className="tournoi-page" style={{position:'relative'}}>
      {tournoi && (
        <button className="quit-btn" onClick={handleQuit} style={{position:'absolute',top:20,right:20,zIndex:10}}>Quitter le tournoi</button>
      )}
      <h1 className="tournoi-title">Tournoi des races de chats</h1>
      <p className="tournoi-subtitle">Vote pour ton chat préféré à chaque tour !</p>

      {error && <div className="tournoi-error">{error}</div>}

      {!tournoi && (
        <div style={{display:'flex', flexDirection:'column', gap:12, alignItems:'center'}}>
          <h2 style={{marginBottom:0}}>Aucun tournoi en cours</h2>
          <p style={{marginTop:0, color:'#888'}}>Clique sur un bouton pour commencer un tournoi</p>
          {!loading && (
            <>
              <button className="start-btn" onClick={handleStart}>
                Lancer un tournoi (8 races aléatoires)
              </button>
              <button className="start-btn" onClick={handleStartAllBreeds}>
                Tournoi toutes les races (long)
              </button>
            </>
          )}
          {loading && (
            <button className="start-btn" disabled style={{minWidth:260}}>Chargement...</button>
          )}
        </div>
      )}

      {tournoi && currentMatch && (
        <>
          <button className="quit-btn" onClick={handleQuit} style={{position:'absolute',top:20,right:20}}>Quitter le tournoi</button>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:12}}>
            <h2 className="tournoi-round" style={{marginBottom:4}}>
              {roundName}
              {totalRounds > 0 && (
                <span style={{fontWeight:400, fontSize:'1rem'}}> ({`Tour ${currentRoundNumber} / ${totalRounds}`})</span>
              )}
            </h2>
            <span style={{color:'#6c63ff', fontWeight:500}}>
              Tour actuel : {currentRoundNumber} / {totalRounds}
            </span>
          </div>
          <div className="tournoi-wrapper">
            <div className="cat-card left-card">
              {currentMatch.cat1 && (
                <>
                  <img src={currentMatch.cat1.url} alt={currentMatch.cat1.breed} className="cat-image" />
                  <div className="cat-overlay left-overlay">
                    <h2>Race : {currentMatch.cat1.breed}</h2>
                  </div>
                  <button
                    className="choose-btn left-btn"
                    onClick={() => handleVote(currentMatch.id, currentMatch.cat1.id)}
                    disabled={loading || voted}
                  >
                    Choisir ce chat
                  </button>
                </>
              )}
            </div>
            <div className="vs-circle">VS</div>
            <div className="cat-card right-card">
              {currentMatch.cat2 && (
                <>
                  <img src={currentMatch.cat2.url} alt={currentMatch.cat2.breed} className="cat-image" />
                  <div className="cat-overlay right-overlay">
                    <h2>Race : {currentMatch.cat2.breed}</h2>
                  </div>
                  <button
                    className="choose-btn right-btn"
                    onClick={() => handleVote(currentMatch.id, currentMatch.cat2.id)}
                    disabled={loading || voted}
                  >
                    Choisir ce chat
                  </button>
                </>
              )}
            </div>
          </div>
          {voted && <div className="tournoi-info">Merci pour ton vote !</div>}
        </>
      )}

      {tournoi && !currentMatch && (
        <div className="tournament-winner">
          <button className="quit-btn" onClick={handleQuit} style={{position:'absolute',top:20,right:20}}>Quitter le tournoi</button>
          <h2>🏆 Gagnant du tournoi !</h2>
          <div className="winner-card">
            <img src={tournoi.rounds.at(-1)?.matches?.[0]?.winner?.url} alt="Vainqueur" />
            <div className="winner-name">{tournoi.rounds.at(-1)?.matches?.[0]?.winner?.breed || "?"}</div>
          </div>
          <div className="tournament-winner-actions">
            <button className="bracket-button" onClick={handleShowBracket} disabled={loading}>Arborescence</button>
            <button className="restart-button" onClick={handleStart} disabled={loading}>Rejouer</button>
          </div>
        </div>
      )}

      {showBracket && bracket.length > 0 && (
        <div className="tournament-bracket">
          <h3>Arborescence du tournoi</h3>
          <div className="bracket-tree">
            {bracket.map((round, idx) => (
              <div key={idx} className="bracket-round">
                <h4>{round.name}</h4>
                {round.matches.map((m, i) => (
                  <div key={m.id} className="bracket-match">
                    <span>{m.cat1?.breed} {m.cat2 ? `vs ${m.cat2?.breed}` : ''}</span>
                    {m.winner && <span className="winner"> → {m.winner.breed}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="close-bracket-btn" onClick={() => setShowBracket(false)}>
            Fermer l'arborescence
          </button>
        </div>
      )}
    </div>
  );
}

export default Tournois;