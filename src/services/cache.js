const { setCache, getCache, hasCache } = require('../utils/cache');
const { login } = require('../configs/prefix');

const setUserJWTToken = async (hash, value) => {
  const key = `${login.success}:${hash}`;
  await setCache(key, value, 60 * 60);
};

const getUserJWTToken = async (hash) => {
  const key = `${login.success}:${hash}`;
  const result = await getCache(key);
  return result;
};

const hasUserJWTToken = async (hash) => {
  const key = `${login.success}:${hash}`;
  const result = await hasCache(key);
  return result;
};

module.exports = {
  setUserJWTToken,
  getUserJWTToken,
  hasUserJWTToken,
};
