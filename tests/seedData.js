const Character = require('../lib/models/Character');

const characters = [
  {
    'allies': [
      'Royal Earthbender Guards'
    ],
    'enemies': [
      'Chin'
    ],
    '_id': '5cf5679a915ecad153ab68c8',
    'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/5/51/46th_Earth_King.png/revision/latest?cb=20130627160441',
    'name': '46th Earth King',
    'affiliation': ' Earth Kingdom Earth Kingdom Royal Family'
  },
  {
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
  },
  {
    'allies': [
      'Tenzin'
    ],
    'enemies': [
      'Equalists'
    ],
    '_id': '5cf5679a915ecad153ab68cd',
    'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/c/cd/Air_Acolyte_woman.png/revision/latest?cb=20140421100225',
    'name': 'Air Acolyte woman',
    'affiliation': ' Air Acolytes Air Temple Island'
  },
  {
    'allies': [
      'Aang'
    ],
    'enemies': [
      'Fire Nation'
    ],
    '_id': '5cf5679a915ecad153ab68ce',
    'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/7/79/Air_Nomad_boy.png/revision/latest?cb=20130714154218',
    'name': 'Air Nomad boy',
    'affiliation': 'Air Nomads'
  },
  {
    'allies': [
      'Fire Nation'
    ],
    'enemies': [
      'Aang'
    ],
    '_id': '5cf5679a915ecad153ab68cc',
    'photoUrl': 'https://vignette.wikia.nocookie.net/avatar/images/2/24/Afiko.png/revision/latest?cb=20121121024128',
    'name': 'Afiko',
    'affiliation': 'Fire Nation'
  }];

module.exports = async() => {
  const characterSeed = await characters.map(character => {
    return Character.create(character);
  });
  return characterSeed;
};

