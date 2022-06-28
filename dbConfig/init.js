const { Pool } = require("pg");

// Config vairable is used for connecting the databse to heroku's database
let config;

if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const pool = new Pool(config);

module.exports = pool;
