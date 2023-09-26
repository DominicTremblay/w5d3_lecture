// we need the connection to the db here
const db = require('../db');

// all the functions that interact with the db

// get the list of actions from the db
const getAllActors = () => {
  // build the query
  const queryTxt = {
    text: `SELECT * FROM actors`,
  };

  // return the whole promise object
  // not returning the actual result

  return db
    .query(queryTxt)
    .then((result) => result.rows)
    .catch((err) => console.log(`Error: err.msg`));
};

// SQL Injection. To type in the URL of the app:
// http://localhost:3000/actors?title='; drop table actors cascade --;
// solution: parameterized query

const getActorsByMovie = (title) => {
  const queryTxt = {
    text: `SELECT movies.id as movie_id, title, released_date, runtime_in_minutes, actors.id as actor_id, first_name, last_name
    FROM movies
    INNER JOIN casting
    ON movies.id = casting.movie_id
    INNER JOIN actors
    ON casting.actor_id = actors.id
    WHERE LOWER(title) like $1`,
    values: [title],
  };

  return db
    .query(queryTxt)
    .then((result) => result.rows)
    .catch((err) => console.log(`Error: err.msg`));
};

const addActor = (firstName, lastName, bio, dob) => {
  // building the query
  const queryTxt = {
    text: `INSERT INTO actors(first_name, last_name, bio, dob) VALUES ($1, $2, $3, $4) RETURNING *`,
    values: [firstName, lastName, bio, dob],
  };

  return db
    .query(queryTxt)
    .then((result) => result.rows)
    .catch((err) => console.log(err));
};

module.exports = {
  addActor,
  getAllActors,
  getActorsByMovie,
};
