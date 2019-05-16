const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/:name', (req, res, next) => {
    const params = req.params.name;
    const name = params.replace(params.charAt(0), params.charAt(0).toUpperCase());
    Character
      .find({ name })
      .select('-__v -_id')
      .then(character => res.send(character))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    if(req.query.nation) {
      const nation = req.query.nation;
      const regex = new RegExp(nation, 'gm');
      Character
        .find({ affiliation: regex })
        .then(characters => res.send(characters))
        .catch(next);
    }
    Character
      .find()
      .select('-__v -_id')
      .then(characters => res.send(characters))
      .catch(next);
  });
