require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const expressGa = require('express-ga-middleware');

app.use(express.json());
app.use(cors());
 
app.use(expressGa(process.env.GA));
app.use('/api/v1/characters', require('./routes/characters'));

app.use(express.static(__dirname + '/Public'));
app.use('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
  next();
});

module.exports = app;
