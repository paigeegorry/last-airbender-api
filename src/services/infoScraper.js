const request = require('superagent');
const { parse } = require('node-html-parser');

const fetchCharacterInfo = () => {
  return request.get('https://avatar.fandom.com/wiki/Katara')
    .then(res => res.text)
    .then(parse)
    .then(html => {
      const labels = html.querySelectorAll('.pi-data-label').map(l => l.childNodes[0].rawText);
      const values = html.querySelectorAll('.pi-data-value').map(v => v.childNodes[0].rawText);
      return [labels, values];
    })
    .then(organizeInfo)
    .then(console.log);
};

const organizeInfo = ([labels, values]) => {
  let character = {};
  labels.map((l, i) => {
    return character[l] = values[i];
  });
  return character;
};

fetchCharacterInfo();
