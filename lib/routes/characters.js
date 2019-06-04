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
      .getRandom(+count)
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
    const { page = 1, perPage = 20, ...search } = req.query;

    const query = Object.entries(search)
      .reduce((query, [key, value]) => {
        query[key] = new RegExp(value, 'gmi');
        return query;
      }, {});

    Character
      .find(query)
      .skip(+perPage * (+page - 1))
      .limit(+perPage)
      .lean()
      .select('name photoUrl allies enemies affiliation')
      .then(characters => res.send(characters))
      .catch(next);
  });
