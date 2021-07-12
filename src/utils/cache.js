const Redis = require('ioredis');

let client;

const createCache = () => {
  client = new Redis({
    port: 6379,
    host: 'nodejs_redis_1',
    family: 4,
    db: 0,
  });
  return client;
};

const getClient = () => {
  let result;
  if (client) {
    result = client;
  } else {
    result = createCache();
  }
  return result;
};

const setCache = async (key, value, expire) => {
  const innerClient = getClient();
  if (expire) {
    await innerClient.set(key, value, 'EX', expire);
  } else {
    await innerClient.set(key, value);
  }
};

const getCache = async (key, defaultValue = null) => {
  const innerClient = getClient();
  const value = await innerClient.get(key);
  let result = defaultValue;
  if (value) {
    result = value;
  }
  return result;
};

const hasCache = async (key) => {
  const innerClient = getClient();
  const result = await innerClient.exists(key);
  return result;
};

module.exports = {
  createCache,
  client: getClient(),
  pipeline: getClient().pipeline,
  setCache,
  getCache,
  hasCache,
};
