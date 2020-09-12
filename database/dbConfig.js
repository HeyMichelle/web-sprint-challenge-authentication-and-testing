const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);


// // ./data/dbConfig.js
// const knex = require('knex');

// const config = require('../knexfile.js');

// // if the environment variable is not set, default to 'development'
// // this variable is only set when running the "test" npm script using npm run test
// const dbEnv = process.env.DB_ENV || 'development';

// // the value of dbEnv will be either 'development' or 'testing'
// // we pass it within brackets to select the corresponding configuration
// // from knexfile.js
// module.exports = knex(config[dbEnv]);