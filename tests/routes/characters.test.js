const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('characters routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://127.0.0.1:27017/lastAirbender', { useNewUrlParser: true });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can get all characters', () => {
    return request(app)
      .get('/characters')
      .then(res => {
        expect(res.body).toHaveLength(368);
        expect(res.body[0]).toEqual({
          name: expect.any(String),
          allies: expect.any(String),
          affiliation: expect.any(String),
          gender: expect.any(String),
          enemies: [expect.any(String)],
          first: expect.any(String),
          photoUrl: expect.any(String),
          position: expect.any(String),
          weapon: expect.any(String)
        });
      });
  });
});
