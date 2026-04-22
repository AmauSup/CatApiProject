// Service pour la logique du tournoi
const catApiService = require('./catApiService');

// Stockage en mémoire (à remplacer par DB si besoin)
let tournoiState = null;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRoundName(round, total) {
  if (round === total - 1) return 'Demi-finale';
  if (round === total) return 'Finale';
  return `Tour ${round}`;
}

async function startTournoi(breedIds) {
  let cats;
  if (Array.isArray(breedIds) && breedIds.length > 0) {
    cats = await catApiService.getCatsByBreedList(breedIds);
  } else {
    cats = await catApiService.getCatsByUniqueBreeds();
  }
  const participants = shuffle(cats);
  const rounds = [];
  let current = participants;
  let roundNum = 1;
  while (current.length > 1) {
    const matches = [];
    for (let i = 0; i < current.length; i += 2) {
      if (i + 1 < current.length) {
        matches.push({
          id: `${roundNum}-${i/2}`,
          cat1: current[i],
          cat2: current[i+1],
          winner: null
        });
      } else {
        matches.push({
          id: `${roundNum}-${i/2}`,
          cat1: current[i],
          cat2: null,
          winner: current[i]
        });
      }
    }
    rounds.push({
      name: getRoundName(roundNum, Math.ceil(Math.log2(participants.length))),
      matches
    });
    current = matches.filter(m => m.winner).map(m => m.winner);
    roundNum++;
  }
  tournoiState = {
    participants,
    rounds,
    currentRound: 0
  };
  return tournoiState;
}

function getTournoi() {
  return tournoiState;
}

function voteMatch(matchId, winnerId) {
  if (!tournoiState) throw new Error('Tournoi non démarré');
  const round = tournoiState.rounds[tournoiState.currentRound];
  const match = round.matches.find(m => m.id === matchId);
  if (!match) throw new Error('Match introuvable');
  if (match.winner) throw new Error('Match déjà joué');
  match.winner = [match.cat1, match.cat2].find(c => c && c.id === winnerId);
  // Si tous les matchs du round sont joués, avancer au round suivant
  if (round.matches.every(m => m.winner)) {
    const nextCats = round.matches.map(m => m.winner);
    if (nextCats.length > 1) {
      // Créer le prochain round
      const matches = [];
      for (let i = 0; i < nextCats.length; i += 2) {
        if (i + 1 < nextCats.length) {
          matches.push({
            id: `${tournoiState.currentRound+2}-${i/2}`,
            cat1: nextCats[i],
            cat2: nextCats[i+1],
            winner: null
          });
        } else {
          matches.push({
            id: `${tournoiState.currentRound+2}-${i/2}`,
            cat1: nextCats[i],
            cat2: null,
            winner: nextCats[i]
          });
        }
      }
      tournoiState.rounds.push({
        name: getRoundName(tournoiState.currentRound+2, Math.ceil(Math.log2(tournoiState.participants.length))),
        matches
      });
    }
    tournoiState.currentRound++;
  }
  return tournoiState;
}

function getBracket() {
  return tournoiState ? tournoiState.rounds : [];
}

module.exports = {
  startTournoi,
  getTournoi,
  voteMatch,
  getBracket
};
