const { Client } = require('pg');

const getConnection = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'fcxmarquez',
    password: '123456',
    database: 'web_store',
  });

  await client.connect();
  return client;
};

module.exports = getConnection;
