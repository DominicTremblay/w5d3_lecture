const express = require('express');
const router = express.Router();

module.exports = (dbHelpers) => {
  /* GET users listing. */
  // get /actors
  // instead of app.get => router.get

  router.get('/', (req, res) => {
    // const title = req.query.title
    const { title } = req.query;

    if (!title) {
      dbHelpers
        .getActors()
        .then((actors) => res.json(actors))
        .catch((err) => console.log(err));
    } else {
      dbHelpers
        .getActorsByMovie(title)
        .then((actors) => res.json(actors))
        .catch((err) => console.log(err));
    }
  });

  router.get('/:id', (req, res) => {
    // get the details of a particular actor => get /actors/2
  });

  router.post('/', (req, res) => {
    // adding a new actor to our db
    const { first_name, last_name, bio, dob } = req.body;

    console.log(req.body);

    dbHelpers
      .addActor(first_name, last_name, bio, dob)
      .then((actor) => res.json(actor))
      .catch((err) => console.log(err));
  });

  return router;
};
