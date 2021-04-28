// helpers to create functions running queries on our movies database
// we need to export a function that takes in the db connection as input param

module.exports = (db) => {
  const getActors = () => {
    const sqlQuery = {
      text: `SELECT id, first_name, last_name, dob FROM actors`,
    };

    return db
      .query(sqlQuery)
      .then((result) => result.rows)
      .catch((err) => err.message);
  };

  // pull out the actors of a particular movie (title)
  const getActorsByMovie = (title) => {
    const sqlQuery = {
      text: `SELECT movies.id as movie_id, title, released_date, runtime_in_minutes, actors.id as actor_id, first_name, last_name
      FROM movies  
      INNER JOIN casting
      ON movies.id = casting.movie_id
      INNER JOIN actors
      ON casting.actor_id = actors.id
      WHERE LOWER(title) like $1`,
      values: [`%${title}%`],
    };

    return db
      .query(sqlQuery)
      .then((result) => result.rows)
      .catch((err) => err.message);
  };

  const addActor = (firstName, lastName, bio, dob) => {
    const sqlQuery = {
      text: `INSERT INTO actors(first_name, last_name, bio, dob) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [firstName, lastName, bio, dob],
    };

    return db
    .query(sqlQuery)
    .then((result) => result.rows[0])
    .catch((err) => err.message);

  };

  return {
    getActors,
    getActorsByMovie,
    addActor
  };
};
