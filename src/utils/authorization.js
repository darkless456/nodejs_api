const hash = require('./hash');
const { cacheService } = require('../services');

const resolveAuthorizationToken = async (headers) => {
  const acceptedToken = headers.authorization;
  let result;
  if (acceptedToken && acceptedToken.startsWith('Bearer')) {
    const jwtToken = acceptedToken.split(' ')[1];
    const tokenCacheHash = hash.md5(jwtToken);
    const data = await cacheService.getUserJWTToken(tokenCacheHash);
    result = JSON.parse(data);
  } else {
    result = null;
  }

  return result;
};

module.exports = {
  resolveAuthorizationToken,
};
