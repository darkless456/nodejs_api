const crypto = require('crypto');

const md5 = (data, format = 'hex') => {
  let result = '';
  if (data) {
    result = crypto.createHash('md5').update(data).digest(format);
  }
  return result;
};

module.exports = {
  md5,
};
