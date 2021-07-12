class BaseModel {
  constructor(message, code, data) {
    if (message) {
      this.message = message;
    }

    if (code) {
      this.code = code;
    }

    if (data && Object.prototype.toString.call(data) !== '[object Boolean]') {
      this.data = data;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message, code) {
    super(message, code, data);

    if (!code) {
      this.code = 0;
    }

    if (!message) {
      this.message = 'success';
    }
  }
}

class ErrorModel extends BaseModel {
  constructor(message, code, data) {
    super(message, code, data);

    if (!code) {
      this.code = -1;
    }

    if (!message) {
      this.message = 'error';
    }
  }
}

class InvalidPathModel extends BaseModel {
  constructor(message, code) {
    super(message, code);
    this.code = 400;
    this.message = 'invalid path';
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
  InvalidPathModel,
};
