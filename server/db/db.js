const { Pool } = require('pg');

const pool = new Pool({
    user: 'junpark',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});

pool.connect()
    .then(() => {
        console.log('connected to db');
    }).catch((err) => {
        console.log('Error connecting to db', err)
    })

module.exports = pool;
