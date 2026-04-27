const request = require('supertest');
const app = require('../server');

describe('Auth routes', () => {
  it('should return 400 if missing fields on signup', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 401 on invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'bad' });
    expect(res.statusCode).toBe(401);
  });
});
