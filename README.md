# SQL from our Apps

* Create DB
* Connecting with node-postgres
* Using environment variables
* Executing queries with promises
* Preventing SQL code injection

## Create DB

 `createdb <db_name> -O <owner>`

## Connecting with node-postgres

We added pg and dotenv modules

 `npm i pg dotenv`

We've used the `.env` to add our database credentials. .env needs to be added our `.gitignore` file so it won't get published to github. Look at [.env.example](.env.example) to see how to define them. 

We created the connection in the [db/connect.js](./db/connect.js) file. `connect.js` contains our pool connection:

``` js
const {
    Pool
} = require('pg');
require('dotenv').config();

// Creating the connection to the dabase
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Making the connection to the database
pool
    .connect()
    .then((client) => console.log(`Connected to ${process.env.DB_NAME} db on ${ process.env.DB_HOST}`))
    .catch((err) => console.log(`Error connecting to ${process.env.DB_NAME} db`));

module.exports = pool;
```

## Executing queries with promises

We've created a few queries within our routes in Express:

* Getting the list of actors
* Getting an actor by id
* Getting the actors of a particular movie
* Creating a new actor 

The general syntax for running a query is the following:

``` js
const sqlQuery = {
    text: < your sql query here > ,
    values: [ < any values you need here > ]
}

db
    .query(sqlQuery)
    .then(result => res.json(result.rows))
    .catch(error => res.json({
        error
    }))
```

## Preventing SQL code injection

We learned how to prevent SQL injection by using parameters in our query ($1, $2, $3, etc.)

For example, the query we used for finding an actor by id contained a parameter:

```js
  const sqlQuery = {

    text: `SELECT * FROM actors WHERE id = $1` ,
    values: [actorId],
  }; 
```

Finally, we did an example of a many to many relationships that required 2 inner joins to spice things up! Let me know if you have any questions.


You can refer to node-postgres documentation

* [Connecting to node-postgres](https://node-postgres.com/features/connecting)
