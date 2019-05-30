require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('characters routes', () => {
  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can get all characters', () => {
    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        expect(res.body).toHaveLength(497);
        expect(res.body[0]).toEqual({
          name: expect.any(String),
          photoUrl: expect.any(String),
          affiliation: expect.any(String),
          allies: expect.any(Array),
          enemies: expect.any(Array),
          _id: expect.any(String),
        });
      });
  });

  it('can get a Character by name', () => {
    return request(app)
      .get('/api/v1/characters?name=Katara')
      .then(res => {
        expect(res.body[0]).toEqual({
          'allies': [
            'Team Avatar'
          ],
          'enemies': [
            'Fire Nation'
          ],
          '_id': expect.any(String),
          'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/3/34/Katara_games.png/revision/latest?cb=20140615101117',
          'name': 'Katara (games)',
          'affiliation': 'Team Avatar'
        },);
      });
  });

  it('can get characters from a specific nation', () => {
    return request(app)
      .get('/api/v1/characters?affiliation=Fire')
      .then(res => {
        expect(res.body).toHaveLength(112);
      });
  });

  it('can handle spaces in nation query', () => {
    return request(app)
      .get('/api/v1/characters?affiliation=Fire+Nation')
      .then(res => {
        expect(res.body).toHaveLength(98);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          photoUrl: expect.any(String),
          affiliation: expect.any(String),
          allies: expect.any(Array),
          enemies: expect.any(Array)
        });
      });
  });

  it('can handle allies query', () => {
    return request(app)
      .get('/api/v1/characters?allies=Appa')
      .then(res => {
        expect(res.body).toHaveLength(3);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          photoUrl: expect.any(String),
          affiliation: expect.any(String),
          allies: ['Appa'],
          enemies: expect.any(Array)
        });
      });
  });

  it('can handle enemies query', () => {
    return request(app)
      .get('/api/v1/characters?enemies=Zuko')
      .then(res => {
        expect(res.body).toHaveLength(10);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          photoUrl: expect.any(String),
          allies: expect.any(Array),
          affiliation: expect.any(String),
          enemies: ['Zuko']
        });
      });
  });

  it('can get a random character', () => {
    return request(app)
      .get('/api/v1/characters/random')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('can get 10 random characters', () => {
    return request(app)
      .get('/api/v1/characters/random?count=10')
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });

  it('can get a character by its id', () => {
    return request(app)
      .get('/api/v1/characters/5cddc833ae7a54279fdb8a1f')
      .then(res => {
        expect(res.body).toEqual({ 
          '_id': '5cddc833ae7a54279fdb8a1f', 
          'affiliation': ' Earth Kingdom Earth Kingdom Royal Family', 
          'allies': ['Royal Earthbender Guards'], 
          'enemies': ['Chin'], 
          'first': 'Escape from the Spirit World', 
          'gender': 'Male', 
          'hair': 'White', 
          'name': '46th Earth King', 
          'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/5/51/46th_Earth_King.png/revision/latest?cb=20130627160441', 
          'position': 'Earth King' 
        });
      });
  });
});
