const request = require('superagent');
const { parse } = require('node-html-parser');
const fetchCharacterName = require('./nameScraper');

module.exports = () => {
  return Promise.all([
    fetchCharacterName(),
    fetchCharacterName('Jingbo'),
    fetchCharacterName('Shiro+Shinobi')
  ])
    .then(([charA, charB, charC]) => {
      return [...charA, ...charB, ...charC];
    })
    .then(characters => {
      return Promise.all(characters.map(character => {
        return request.get(`https://avatar.fandom.com/wiki/${character}`)
          .then(res => res.text)
          .then(parse)
          .then(html => {
            const labels = html.querySelectorAll('.pi-data-label').map(l => l.childNodes[0].rawText);
            const values = html.querySelectorAll('.pi-data-value').map(v => v.childNodes[0].rawText);
            const photoInfo = html.querySelectorAll('.pi-image-thumbnail')[0];
            return [labels, values, character, photoInfo];
          })
          .then(organizeInfo);
      }));
    });
};

const organizeInfo = async([labels, values, character, photoInfo = '']) => {
  let obj = {};
  if(photoInfo) {
    const photo = photoInfo.parentNode.rawAttrs.split('"')[1];    
    obj.photoUrl = photo;
  }
  obj.name = character;
  labels.map((l, i) => {
    return obj[l.split(' ')[0].toLowerCase()] = values[i];
  });
  if(obj.enemies) {
    obj.enemies = obj.enemies.split(', ');
  }
  if(obj.allies) {
    obj.allies = obj.allies.split(', ');
  }
  return obj;
};
