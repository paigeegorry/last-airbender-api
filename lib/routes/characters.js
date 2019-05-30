const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/avatar', (req, res, next) => {
    const regex = new RegExp('Avatar', 'gm');
    Character
      .find({ profession: regex })
      .select('-__v')
      .then(characters => res.send(characters))
      .catch(next);
  })

  .get('/random', (req, res, next) => {
    const { count = 1 } = req.query;

    Character
      .getRandom(count)
      .then(character => res.send(character))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Character
      .findById(req.params.id)
      .select('-__v')
      .then(character => res.send(character))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const query = Object.entries(req.query)
      .reduce((query, [key, value]) => {
        query[key] = new RegExp(value, 'gmi');
        return query;
      }, {});

    Character
      .find(query)
      .select('name photoUrl allies enemies affiliation')
      .then(characters => res.send(characters))
      .catch(next);
  });
