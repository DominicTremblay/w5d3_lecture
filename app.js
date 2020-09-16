const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const {
  getActors,
  getActorById,
  getActorsByMovie,
  addNewActor,
} = require('./helpers/dbHelpers')(db);

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

app.get('/actors', (req, res) => {
  const { movie } = req.query;

  if (!movie) {
    getActors()
      .then((actors) => res.json(actors))
      .catch((err) => res.send(err));
  } else {
    getActorsByMovie(movie)
      .then((actors) => res.json(actors))
      .catch((err) => res.send(err));
  }
});

app.get('/actors/:id', (req, res) => {
  const { id } = req.params;
  getActorById(id)
    .then((actor) => res.json(actor))
    .catch((err) => res.json({ err: err.message }));
});

app.post('/actors', (req, res) => {
  const actor = req.body;

  addNewActor(actor)
    .then((actor) => res.json(actor))
    .catch((err) => res.json({ err }));
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
