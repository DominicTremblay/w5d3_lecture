# SQL from our Apps

## Content

- Create DB
- Connecting with node-postgres
- Using environment variables
- Executing queries with promises
- Preventing SQL code injection
- Modularizing with helper functions

## Create DB

`createdb <db_name> -O <owner>`

## Connecting with node-postgres

We added pg and dotenv modules

`npm i pg dotenv`

We've used the `.env` to add our database credentials. .env needs to be added our `.gitignore` file so it won't get published to github. Look at [.env.example](.env.example) to see how to define them. 

We created the connection in the [db/index.js](./db/index.js) file.

You can refer to node-postgres documentation

- [Conecting to node-postgres](https://node-postgres.com/features/connecting)

## dbHelpers

We've abstracted all our queries in our [helpers/dbHelpers.js](./helpers/dbHelpers.js) file. All the helper function have been imported into [app.js](./app.js) where they've been used in the corresponding route.

