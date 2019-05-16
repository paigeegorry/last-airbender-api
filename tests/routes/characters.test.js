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
      .get('/characters')
      .then(res => {
        expect(res.body).toHaveLength(497);
        expect(res.body[0]).toEqual({
          enemies: [expect.any(String)],
          first: expect.any(String),
          gender: expect.any(String),
          hair: expect.any(String),
          name: expect.any(String),
          photoUrl: expect.any(String),
          affiliation: expect.any(String),
          allies: [expect.any(String)],
          position: expect.any(String)
        });
      });
  });
  it('can get a Character by name', () => {
    return request(app)
      .get('/characters/katara')
      .then(res => {
        expect(res.body).toEqual([{ 
          enemies: ['Ozai'],
          photoUrl:
         'https://vignette.wikia.nocookie.net/avatar/images/7/7a/Katara_smiles_at_coronation.png/revision/latest?cb=20150104171449',
          name: 'Katara',
          gender: 'Female',
          eye: 'Blue',
          hair: 'Dark brown ',
          skin: 'Brown',
          love: ' Aang (husband; widowed) Jet (formerly)[8]',
          allies: ['Southern Water Tribe', 'Aang', ''],
          weapon: 'Water',
          profession: ' Healer Waterbending instructor',
          position:
         ' Daughter of Southern Water Tribe chief Master healer Waterbending master',
          affiliation: ' Team Avatar Water Tribe',
          first: '"'
        }]);
      });
  });

  it('can get characters from a specific nation', () => {
    return request(app)
      .get('/characters?nation=Fire')
      .then(res => {
        expect(res.body).toHaveLength(112);
      });
  });

  it('can handle spaces in nation query', () => {
    return request(app)
      .get('/characters?nation=Fire+Nation')
      .then(res => {
        expect(res.body).toHaveLength(98);
      });
  });

  it('can handle allies query', () => {
    return request(app)
      .get('/characters?allies=Appa')
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });

  it('can handle enemies query', () => {
    return request(app)
      .get('/characters?enemies=Zuko')
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });

  it('can get a random character', () => {
    return request(app)
      .get('/characters/random')
      .then(res => {
        expect(res.body).toEqual(expect.any(Object));
      });
  });
});
