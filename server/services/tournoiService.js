function deleteTournoi() {
  tournoiState = null;
}
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
  let totalRounds = Math.ceil(Math.log2(participants.length));

  // Génère tous les rounds à l'avance
  let roundParticipants = [...participants];
  for (let r = 1; roundParticipants.length > 1; r++) {
    const matches = [];
    for (let i = 0; i < roundParticipants.length; i += 2) {
      if (i + 1 < roundParticipants.length) {
        matches.push({
          id: `${r}-${i/2}`,
          cat1: roundParticipants[i],
          cat2: roundParticipants[i+1],
          winner: null
        });
      } else {
        matches.push({
          id: `${r}-${i/2}`,
          cat1: roundParticipants[i],
          cat2: null,
          winner: null
        });
      }
    }
    rounds.push({
      name: getRoundName(r, totalRounds),
      matches
    });
    // Prépare la liste pour le prochain round (on ne connaît pas encore les gagnants)
    roundParticipants = new Array(Math.ceil(roundParticipants.length / 2)).fill(null);
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
  const roundIdx = tournoiState.currentRound;
  const round = tournoiState.rounds[roundIdx];
  const matchIdx = round.matches.findIndex(m => m.id === matchId);
  if (matchIdx === -1) throw new Error('Match introuvable');
  const match = round.matches[matchIdx];
  if (match.winner) throw new Error('Match déjà joué');
  match.winner = [match.cat1, match.cat2].find(c => c && c.id === winnerId);

  // Propage le gagnant dans le round suivant
  if (round.matches.every(m => m.winner)) {
    const nextRoundIdx = roundIdx + 1;
    const nextRound = tournoiState.rounds[nextRoundIdx];
    if (nextRound) {
      // Place chaque gagnant dans le match du round suivant
      let winners = round.matches.map(m => m.winner).filter(Boolean);
      for (let i = 0; i < winners.length; i++) {
        const matchIdxNext = Math.floor(i / 2);
        const pos = i % 2 === 0 ? 'cat1' : 'cat2';
        if (!nextRound.matches[matchIdxNext][pos]) {
          nextRound.matches[matchIdxNext][pos] = winners[i];
        }
      }
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
  getBracket,
  deleteTournoi
};
