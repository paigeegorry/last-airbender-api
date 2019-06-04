require('dotenv').config();
const mongoose = require('mongoose');
const fetchCharacterInfo = require('./lib/services/infoScraper');
const Character = require('./lib/models/Character');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const seedData = () => {
  return fetchCharacterInfo()
    .then(characters => Character.create(characters))
    .then(() => console.log('done'))
    .finally(() => mongoose.connection.close())
    .catch(console.log);
};

seedData();
