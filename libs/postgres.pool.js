const { Pool } = require('pg');

const { config } = require('../config/config');
// The async is not necessary because the pool is already asynchronous

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// encodeURIComponent encode special characters to be able to use them in the URI
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// URI is a string that contains the connection information to the database

const pool = new Pool({ connectionString: URI });

module.exports = pool;
