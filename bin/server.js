const http = require('http');
const database = require('../src/utils/database');
const cache = require('../src/utils/cache');
const handler = require('../app');

const boot = () => {
  database.createDatabasePool();
  cache.createCache();

  const PORT = 80;
  const HOST = '0.0.0.0';

  const server = http.createServer(handler);

  server.listen(PORT, HOST);
  console.log(`Running on ${HOST}:${PORT}`);
};

boot();
