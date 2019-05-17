/* eslint-disable no-console */
require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
