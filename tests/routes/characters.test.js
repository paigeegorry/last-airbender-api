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
          _id: expect.any(String),
          enemies: ['Ozai'],
          photoUrl:
         'https://vignette.wikia.nocookie.net/avatar/images/7/7a/Katara_smiles_at_coronation.png/revision/latest?cb=20150104171449',
          name: 'Katara',
          allies: ['Southern Water Tribe', 'Aang', ''],
          affiliation: ' Team Avatar Water Tribe',
        });
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

  it.only('can get a character by its id', () => {
    return request(app)
      .get('/api/v1/characters/5cdf0769b6e02a467e3e7735')
      .then(res => {
        expect(res.body).toEqual(
          {
            'allies': [
              'Southern Water Tribe',
              'Aang',
              ''
            ],
            'enemies': [
              'Ozai'
            ],
            '_id': '5cdf0769b6e02a467e3e7735',
            'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/7/7a/Katara_smiles_at_coronation.png/revision/latest?cb=20150104171449',
            'name': 'Katara',
            'gender': 'Female',
            'eye': 'Blue',
            'hair': 'Dark brown ',
            'skin': 'Brown',
            'love': ' Aang (husband; widowed) Jet (formerly)[8]',
            'weapon': 'Water',
            'profession': ' Healer Waterbending instructor',
            'position': ' Daughter of Southern Water Tribe chief Master healer Waterbending master',
            'affiliation': ' Team Avatar Water Tribe',
            'first': '"'
          }
        );
      });
  });
});
