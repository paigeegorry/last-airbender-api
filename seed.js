const mongoose = require('mongoose');
const fetchCharacterInfo = require('./src/services/infoScraper');
const Character = require('./lib/models/Character');

mongoose.connect('mongodb://127.0.0.1:27017/lastAirbender', { useNewUrlParser: true });

fetchCharacterInfo()
  .then(characters => Character.create(characters))
  .finally(() => mongoose.connection.close())
  .catch(console.log);
