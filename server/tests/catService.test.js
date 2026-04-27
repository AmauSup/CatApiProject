const catService = require('../services/catApiService');

describe('catService', () => {
  it('should have a getRandomCats function', () => {
    expect(typeof catService.getRandomCats).toBe('function');
  });
});
