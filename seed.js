require('dotenv').config();
const mongoose = require('mongoose');
const fetchCharacterInfo = require('./lib/services/infoScraper');
const Character = require('./lib/models/Character');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

fetchCharacterInfo()
  .then(characters => Character.create(characters))
  .finally(() => mongoose.connection.close())
  .catch(console.log);
