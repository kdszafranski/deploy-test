// importing pg module
const pg = require('./node_modules/pg');
const Pool = pg.Pool;
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: { rejectUnauthorized: false },
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
} else {
    config = {
        host: 'localhost', // Server hosting the postgres database
        port: 5432, // env var: PGPORT
        database: 'weekend-to-do-app', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
}

const pool = new Pool(config);
// establishing a connection to the database
pool.on('connect', () => {
    console.log('Database connected');
});

pool.on('error', (error) => {
    console.log('Database failure', error);
});

module.exports = pool;