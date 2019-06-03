require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const seedData = require('../seedData');

describe('characters routes', () => {
  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
      .then(() => seedData());
  });

  afterAll(() => {
    return mongoose.connection.dropDatabase()
      .then(() => mongoose.connection.close());
  });

  it('can get all characters', () => {
    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        expect(res.body).toHaveLength(5);
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
      .get('/api/v1/characters?name=Aang')
      .then(res => {
        expect(res.body[0]).toEqual({
          'allies': [
            'Appa'
          ],
          'enemies': [
            'Azula'
          ],
          '_id': '5cf5679a915ecad153ab68c9',
          'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/a/ae/Aang_at_Jasmine_Dragon.png/revision/latest?cb=20130612174003',
          'name': 'Aang',
          'affiliation': ' Air Acolytes Air Nomads Air Scouts (formerly) Team Avatar'
        });
      });
  });

  it('can get characters from a specific nation', () => {
    return request(app)
      .get('/api/v1/characters?affiliation=Fire')
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          affiliation: 'Fire Nation',
          allies: expect.any(Array),
          enemies: expect.any(Array),
          name: expect.any(String),
          photoUrl: expect.any(String)
        });
      });
  });

  it('can handle spaces in nation query', () => {
    return request(app)
      .get('/api/v1/characters?affiliation=Fire+Nation')
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual({ 
          '_id': '5cf5679a915ecad153ab68cc', 
          'affiliation': 'Fire Nation', 
          'allies': ['Fire Nation'], 
          'enemies': ['Aang'], 
          'name': 'Afiko', 
          'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/2/24/Afiko.png/revision/latest?cb=20121121024128' });
      });
  });

  it('can handle allies query', () => {
    return request(app)
      .get('/api/v1/characters?allies=Appa')
      .then(res => {
        expect(res.body).toHaveLength(1);
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
      .get('/api/v1/characters?enemies=Azula')
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          photoUrl: expect.any(String),
          allies: expect.any(Array),
          affiliation: expect.any(String),
          enemies: ['Azula']
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
      .get('/api/v1/characters/random?count=2')
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
  });

  it('can get a character by its id', () => {
    return request(app)
      .get('/api/v1/characters/5cf5679a915ecad153ab68c8')
      .then(res => {
        expect(res.body).toEqual({ 
          '_id': '5cf5679a915ecad153ab68c8', 
          'affiliation': ' Earth Kingdom Earth Kingdom Royal Family', 
          'allies': ['Royal Earthbender Guards'], 
          'enemies': ['Chin'], 
          'name': '46th Earth King', 
          'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/5/51/46th_Earth_King.png/revision/latest?cb=20130627160441'
        });
      });
  });
});
