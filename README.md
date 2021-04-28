# W5D3 - SQL From our Apps

* Create a database
* Create schema and seeds
* Connect the database to our Express app
* Running queries
* Demonstrate SQL Injections
* Sanitize our queries

## Create our Database

We can create the database directly from the command-line. The following will create the movies db with owner labber:

 `createdb movies -O labber`

## Create Schemas and Seeds

We're creating sql scripts for our schema and seed file:

* [schema.sql](./demo/db/schema.sql)
* [seeds.sql](/demo/db/seeds.sql)

### Running the schema and seeds

* From the command-line:

  +  `psql movies < db/schema.sql`
  +  `psql movies < db/seeds.sql`

* Create a script in package.json

 `"db:reset": "psql -U labber -d movies < ./db/schema.sql && psql -U labber -d movies < ./db/seeds.sql", `

## Connect the database to our Express app

To connect our db with our app, we need to:

1. Install [node-postgres](https://node-postgres.com/)
2. Configure the connection

### Install Node-Postgres

 `npm install pg`

### Configure the connection

#### Environment Variables

Because we don't want to push our database credentials to gihub, we're going to use `.env`

 `npm install dotenv`

Let's create the following .env file:

``` sh
DB_HOST=localhost
DB_NAME=<db name>
DB_USER=<username>
DB_PASS=<password>
DB_PORT=5432
```

#### Creating the connection file

Let's add the following connection file `index.js` to our db folder:

``` js
const {
    Pool
} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

console.log(`Connecting to DB: ${process.env. DB_NAME}`);

module.exports = pool;
```

#### Adding db to Express

We're going to establish to connection to the db with the followinf require in app.js

 `const db = require('./db'); `

## Running queries

- Create DatabaHelpers file => contain all the functions running the queries
- Router files => end-points => call the helpers functions to run the queries




### Database Helpers

To run queries, we're going to add helpers functions.

* create `helpers/dbHelpers.js`
* module.exports a function with the db connection as input parameter
* create a getActors function to run a query to pull to actors info from our db

``` js
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

    return {
        getActors
    };
};
```

We need to require `dbHelpers` in `app.js` and pass the db as an argument:

 `const dbHelpers = require('./helpers/dbHelpers')(db); `

### Creating the Actors Router

We need to create an `actors` route file to handle our end points:

``` js
const express = require('express');
const router = express.Router();

/* GET actors listing. */

module.exports = ({
            getActors) => {
            router.get('/', (req, res) => {
                dbHelpers
                    .getActors()
                    .then((actors) => res.json(actors))
                    .catch((err) => console.log(`Error: ${err}`));
            });

            return router;
        };
```

The router needs to be added to `app.js`

 `const actorRouter = require('./routes/actors'); `

We need to pass the dbHelpers as an argument:

 `app.use('/actors', actorRouter(dbHelpers)); `

### SQL Injection

Let's add a `getActorsByMovie` function to our `dbHelpers` :

``` js
const getActorsByMovie = (title) => {
    const sqlQuery = {
        text: `SELECT movies.id as movie_id, title, released_date, runtime_in_minutes, actors.id as actor_id, first_name, last_name
      FROM movies
      INNER JOIN casting
      ON movies.id = casting.movie_id
      INNER JOIN actors
      ON casting.actor_id = actors.id
      WHERE LOWER(title) like '%${title}%'`,
    };

    return db
        .query(sqlQuery)
        .then((result) => result.rows)
        .catch((err) => err.message);
};
```

We'll need to update our actors route:

``` js
router.get('/', (req, res) => {
    const {
        title
    } = req.query;

    if (!title) {
        dbHelpers
            .getActors()
            .then((actors) => res.json(actors))
            .catch((err) => console.log(`Error: ${err}`));
    } else {
        dbHelpers
            .getActorsByMovie(title)
            .then((actors) => res.json(actors))
            .catch((err) => console.log(`Error: ${err}`));
    }
});
```

Let's execute the following that will completely drop the actors table of our database!

 `http://localhost:3000/actors?title='; drop table actors cascade --; `

## Sanitize our queries

To prevent SQL injection, we're going to use parameterized queries:

## Bonus Create an Insert Query

``` js
  const addActor = (firstName, lastName, bio, dob) => {

      const sqlQuery = {
          text: `INSERT INTO actors(first_name, last_name, bio, dob) VALUES ($1, $2, $3, $4) RETURNING *`,
          values: [firstName, lastName, bio, dob]
      }

      return db
          .query(sqlQuery)
          .then((result) => result.rows[0])
          .catch((err) => err.message);
  }
```

  We need to create the route in actors:

``` js
  router.post('/', (req, res) => {
      const {
          first_name,
          last_name,
          bio,
          dob
      } = req.body;

      dbHelpers
          .addActor(first_name, last_name, bio, dob)
          .then((actor) => res.json(actor))
          .catch((err) => console.log(`Error: ${err}`));
  });
```
