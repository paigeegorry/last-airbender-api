const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  photoUrl: String,
  name: {
    type: String,
    required: true
  },
  gender: String,
  eye: String,
  hair: String,
  skin: String,
  love: String,
  allies: Array,
  enemies: Array,
  weapon: String,
  profession: String,
  position: String,
  predecessor: String,
  affiliation: String,
  first: String,
  voicedBy: String
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Character', characterSchema);
