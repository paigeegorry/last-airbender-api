const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/characters', require('./routes/characters'));

//eslint-disable-next-line
module.exports = app;
