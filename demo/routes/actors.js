const express = require('express');
const router = express.Router();
const {
  getAllActors,
  getActorsByMovie,
  addActor,
} = require('../helpers/dbHelpers');

// implied that '/' means '/actors'

// declare the routes
router.get('/', (req, res) => {
  const { title } = req.query;

  if (!title) {
    getAllActors()
      .then((actors) => res.json({ actors }))
      .catch((err) => res.json({ err: err.message }));
  } else {
    getActorsByMovie(title)
      .then((actors) => res.json({ actors }))
      .catch((err) => res.json({ err: err.message }));
  }
});

router.post('/', (req, res) => {
  // extract the actors info from the body request
  const { first_name, last_name, dob, bio } = req.body;

  // call the addActor with all the info => add the new actor to the db
  addActor(first_name, last_name, bio, dob)
  // send back the newly created actor as a response
    .then((actor) => res.json({ actor }))
    .catch((err) => console.log({ err: err.message }));


});

router.delete('/:id', (req, res) => {
  res.json({ msg: 'deleting actor' });
});

module.exports = router;
