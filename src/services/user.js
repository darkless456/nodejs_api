const { UserModels, ResponseModels } = require('../models');
const { exec } = require('../utils/database');
const cacheService = require('./cache');
const cryptoService = require('./crypto');

const getUserTokenByAuth = async (user, pwd) => {
  const result = await exec('select * from nodejs_blog.user where username=? and password=? limit ?', [user, pwd, 1]);
  let response;
  if (result.length > 0) {
    const userInfo = new UserModels.UserInfoModal(result[0]);
    const token = cryptoService.generateJWTToken(userInfo);
    const data = new UserModels.LoginSuccessModel(token);
    const hash = cryptoService.generateJWTTokenHash(token);
    const loginCache = new UserModels.LoginCacheModel(userInfo, token, hash);
    await cacheService.setUserJWTToken(loginCache.hash, JSON.stringify(loginCache));
    response = new ResponseModels.SuccessModel(data);
  } else {
    response = new ResponseModels.ErrorModel('login fail, user or password is error', 404);
  }
  return response;
};

module.exports = {
  getUserTokenByAuth,
};
