const { cacheService } = require('../services');
const { GuardModels } = require('../models');
const { generateJWTTokenHash } = require('../services/crypto');

const loginGuard = async (headers) => {
  const acceptedToken = headers.authorization;
  let result;
  if (acceptedToken && acceptedToken.startsWith('Bearer')) {
    const jwtToken = acceptedToken.split(' ')[1];
    const tokenCacheHash = generateJWTTokenHash(jwtToken);
    const isExisted = await cacheService.hasUserJWTToken(tokenCacheHash);
    if (isExisted) {
      result = true;
    } else {
      result = new GuardModels.TokenExpiredModel();
    }
  } else {
    result = new GuardModels.UnauthorizedModel();
  }
  return result;
};

module.exports = {
  loginGuard,
};
