const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/random', (req, res, next) => {
    if(req.query.count) {
      const num = Number(req.query.count);
      Character
        .getRandom(num)
        .then(characters => res.send(characters))
        .catch(next);
    }
    Character
      .getRandom(1)
      .then(character => res.send(character))
      .catch(next);
  })
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
      const params = req.query.nation;
      const nation = params.replace(params.charAt(0), params.charAt(0).toUpperCase());
      const regex = new RegExp(nation, 'gm');
      Character
        .find({ affiliation: regex })
        .select('name photoUrl affiliation')
        .then(characters => res.send(characters))
        .catch(next);
    }
    else if(req.query.allies) {
      const params = req.query.allies;
      const allies = params.replace(params.charAt(0), params.charAt(0).toUpperCase());
      const regex = new RegExp(allies, 'gm');
      Character
        .find({ allies: regex })
        .select('name photoUrl allies enemies')
        .then(characters => res.send(characters))
        .catch(next);
    }
    else if(req.query.enemies) {
      const params = req.query.enemies;
      const enemies = params.replace(params.charAt(0), params.charAt(0).toUpperCase());
      const regex = new RegExp(enemies, 'gm');
      Character
        .find({ enemies: regex })
        .select('name photoUrl allies enemies')
        .then(characters => res.send(characters))
        .catch(next);
    }
    Character
      .find()
      .select('name photoUrl')
      .then(characters => res.send(characters))
      .catch(next);
  });
