const tournoiService = require('../services/tournoiService');

describe('Tournoi service', () => {
  it('should start a tournoi and return state', async () => {
    const state = await tournoiService.startTournoi([]);
    expect(state).toHaveProperty('participants');
    expect(state).toHaveProperty('rounds');
    expect(state.rounds.length).toBeGreaterThan(0);
  });

  it('should get the current tournoi', () => {
    const tournoi = tournoiService.getTournoi();
    expect(tournoi).not.toBeNull();
  });
});
