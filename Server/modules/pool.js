// importing pg module
const pg = require('pg');

const Pool = pg.Pool;

// creating a new instance of pool with database attributes
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

// establishing a connection to the database
pool.on('connect', () => {
    console.log('Database connected');
});

pool.on('error', (error) => {
    console.log('Database failure', error);
});

module.exports = pool;