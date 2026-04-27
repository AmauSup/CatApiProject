const request = require('supertest');
const app = require('../server');

describe('Favorites route', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/favorites');
    expect(res.statusCode).toBe(401);
  });
});
