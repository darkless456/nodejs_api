const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { HASH_SECRET_KEY, JWT_SECRET_KEY } = require('../configs/secret');
const hash = require('../utils/hash');

const generateJWTTokenHash = (token) => {
  return hash.md5(`${token}${HASH_SECRET_KEY}`);
};

const generateJWTToken = (userInfo) => {
  const uuid = uuidv4();
  const token = jwt.sign({
    uuid,
    uid: userInfo.id,
    createTime: Date.now(),
  }, JWT_SECRET_KEY, {
    expiresIn: '24h',
  });
  return token;
};

module.exports = {
  generateJWTTokenHash,
  generateJWTToken,
};
