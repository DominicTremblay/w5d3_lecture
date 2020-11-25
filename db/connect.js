const { Pool } = require('pg');
require('dotenv').config();

// Creating the connection to the dabase
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Making the connection to the database
pool
  .connect()
  .then((client) => console.log(`Connected to ${process.env.DB_NAME} db on ${ process.env.DB_HOST}`))
  .catch((err) => console.log(`Error connecting to ${process.env.DB_NAME} db`));

module.exports = pool;
