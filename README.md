# Last Airbender API

**Authors**: [Paige Gorry](https://github.com/paigeegorry)

**[last-airbender-api.herokuapp.com](https://last-airbender-api.herokuapp.com)**

## Overview
This is an open-source API that provides character information from Avatar: The Last Airbender. This information is publicly sourced; I do not claim to own.

![LastAirbender](https://res.cloudinary.com/dkrup6iyl/image/upload/v1558546077/Screen_Shot_2019-05-22_at_10.27.23_AM.png)

## Technologies used
Node.js, [MongoDB](https://www.mongodb.com/what-is-mongodb), [Express](https://www.npmjs.com/package/express), [Jest](https://www.npmjs.com/package/jest), [SuperTest](https://www.npmjs.com/package/supertest), [nodemon](https://www.npmjs.com/package/nodemon), [dotenv](https://www.npmjs.com/package/dotenv), [Mongoose](https://www.npmjs.com/package/mongoose), [morgan](https://www.npmjs.com/package/morgan), [SuperAgent](https://www.npmjs.com/package/superagent), [node-html-parser](https://www.npmjs.com/package/node-html-parser)

## Routes
_All routes are GET routes_
* **GET /api/v1/characters** - get all characters
* **GET /api/v1/characters/${CharacterId}** - get character by id
* **GET /api/v1/characters?affiliation=${Nation+Name}** - get characters with a specific affiliation
(i.e. Fire+Nation, Water+Tribe, etc.)
* **GET /api/v1/characters?enemies=${Character+Name}** - get characters that are enemies of a specific character
* **GET /api/v1/characters?allies=${Character+Name}** - get characters who are allies of a specific character
* **GET /api/v1/characters?name=${Character+Name}** - get characters who's name matches a string
* **GET /api/v1/characters/random** - get one random character
* **GET /api/v1/characters/random?count=${Num}** - get a number of random characters
* **GET /api/v1/characters/avatar** - get all avatars



## Getting Started
I welcome any and all contributions! Feel free to submit a Pull Request with your changes to make this a better API for everyone!

1. Clone and download [GitHub repo](https://github.com/paigeegorry/last-airbender-api)
1. Install dependencies:\
`npm i`

3. Run scripts:\
`npm run lint`\
`npm run pretest`\
`npm run test`\
`npm run test:watch`\
`npm run start` (start node server)\
`npm run start:watch` (start nodemon server)\
`npm run seed` (seed database)\
`npm run drop` (drop MongoDB)\
`npm run db-load-all` (drop db and load seed data from scratch)

## License
Standard [MIT](/LICENSE.md)

## Acknowledgements
Thank you to [Kate Dameron](https://github.com/Katedam) for helping me structure all of this monstrous data (497 characters!!!!!).
