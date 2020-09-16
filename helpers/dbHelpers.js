module.exports = (db) => {
  const getActors = () => {
    const query = {
      text: `SELECT * FROM actors`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err.message);
  };

  const getActorById = (id) => {
    const query = {
      text: `SELECT * FROM actors WHERE id=$1`,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err.message);
  };

  const getMovieByTitle = (title) => {
    const query = {
      text: `SELECT * FROM movies WHERE LOWER(title) LIKE $1`,
      values: [`%${title}%`],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err.message);
  };

  const getActorsByMovie = (title) => {
    const query = {
      text: `SELECT movies.id as movie_id, title, first_name, last_name, bio, dob FROM movies 
             INNER JOIN casting
             ON movies.id = casting.movie_id
             INNER JOIN actors
             ON casting.actor_id = actors.id
             WHERE LOWER(title) LIKE $1`,
      values: [`%${title}%`],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err.message);
  };

  const addNewActor = ({ first_name, last_name, bio, dob }) => {
    const query = {
      text: `INSERT INTO actors(first_name, last_name, bio, dob)
        VALUES($1, $2, $3, $4) RETURNING *`,
      values: [first_name, last_name, bio, dob],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err.message);

  };

  return {
    getActors,
    getActorById,
    getMovieByTitle,
    getActorsByMovie,
    addNewActor
  };
};
