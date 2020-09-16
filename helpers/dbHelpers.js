module.exports = (db) => {
  const getActors = () => {
    const query = {
      text: 'SELECT id, first_name, last_name, dob FROM actors;',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getActorById = (id) => {
    const query = {
      text: 'SELECT id, first_name, last_name, dob FROM actors WHERE id=$1',
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getActorsByMovie = (title) => {
    const query = {
      text: `SELECT movies.id as movie_id, title, released_date, runtime_in_minutes, actors.id as actor_id, first_name, last_name
              FROM movies
              INNER JOIN casting
              ON movies.id = casting.movie_id
              INNER JOIN actors
              ON casting.actor_id = actors.id
              WHERE LOWER(title) like '%${title}%'`,
    };

    console.log(query.text);

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err.message);
  };

  const addNewActor = ({ first_name, last_name, bio, dob }) => {
    const query = {
      text: `INSERT INTO actors(first_name, last_name, bio, dob)
             VALUES($1,$2,$3,$4) RETURNING *`,
      values: [first_name, last_name, bio, dob],
    };

    return query(query)
      .then((result) => result.rows[0])
      .catch((err) => err.message);
  };

  return {
    getActors,
    getActorById,
    getActorsByMovie,
    addNewActor
  };
};
