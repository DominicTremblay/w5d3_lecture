const express = require('express');
const router = express.Router();

/* GET users listing. */
// get /users
// instead of app.get => router.get

router.get('/', function(req, res, next) {
  res.send('users list');
});

module.exports = router;
