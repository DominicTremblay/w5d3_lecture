const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Get the instance of the database
const db = require('./db/connect');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Routes for our movies data
// Pull out the actors data from the actors table in our database
// if a query parameter is provided -> get /actors?movie=deadpool return the actors of that particular movie

app.get('/actors', (request, response) => {
  const { movie } = request.query;

  if (!movie) {
    const sqlQuery = {
      text: `SELECT * FROM actors`,
    };

    db.query(sqlQuery)
      .then((result) => {
        // array of actor objects
        const actors = result.rows;

        // sending back the array of objects to the client (browser)
        response.json(actors);
      })
      .catch((e) => console.error(e.stack));
  } else {
    const sqlQuery = {
      text: `
        SELECT first_name, last_name, movie_id FROM actors
        INNER JOIN casting
        ON actors.id = casting.actor_id
        INNER JOIN movies
        ON casting.movie_id = movies.id
        WHERE LOWER(title) LIKE $1`,
      values: [`%${movie}%`],
    };
    db.query(sqlQuery)
      .then((result) => {
        // array of actor objects
        const actors = result.rows;

        // sending back the array of objects to the client (browser)
        response.json(actors);
      })
      .catch((e) => console.error(e.stack));
  }
});

app.get('/actors/:actorId', (req, res) => {
  const { actorId } = req.params;

  const sqlQuery = {
    text: `SELECT * FROM actors WHERE id = $1`,
    values: [actorId],
  };

  db.query(sqlQuery)
    .then((result) => res.json(result.rows))
    .catch((error) => res.json({ error }));
});

app.post('/actors', (req, res) => {
  const { first_name, last_name, bio, dob } = req.body;

  const sqlQuery = {
    text: `INSERT INTO actors (first_name, last_name, bio, dob) VALUES ($1, $2, $3, $4) RETURNING *`,
    values: [first_name, last_name, bio, dob],
  };

  db
    .query(sqlQuery)
    .then((result) => res.json(result.rows))
    .catch((error) => res.json({ error }));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
