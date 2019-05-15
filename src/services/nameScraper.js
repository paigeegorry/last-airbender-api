const request = require('superagent');
const { parse } = require('node-html-parser');

const fetchAvatarCharacters = (query) => {
  return request.get(`https://avatar.fandom.com/wiki/Category:Characters?from=${query}`)
    .then(res => res.text)
    .then(parse)
    .then(findCharLink)
    .then(findCharNames)
    .then(console.log);
};

const findCharLink = html => html.querySelectorAll('.category-page__member-link');
const findCharNames = objs => {
  const names = objs.map(obj => obj.childNodes[0].rawText);
  return names.filter(name => !name.includes('Category:'));
};

fetchAvatarCharacters('Aang');
fetchAvatarCharacters('Jingbo');
fetchAvatarCharacters('Shiro+Shinobi');
