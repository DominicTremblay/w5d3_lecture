const { Pool } = require('pg')
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'movies',
  password: 'labber',
  port: 5433,
});

console.log(`Connecting to movies datbase`);

module.exports = pool;