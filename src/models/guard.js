class UnauthorizedModel {
  constructor() {
    this.message = 'unauthorized HTTP';
    this.code = 401;
  }
}

class TokenExpiredModel {
  constructor() {
    this.message = 'login expired';
    this.code = 410;
  }
}

module.exports = {
  UnauthorizedModel,
  TokenExpiredModel,
};
