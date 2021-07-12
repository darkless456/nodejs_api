class UserInfoModal {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.username = userInfo.username;
    this.realname = userInfo.realname;
    this.createTime = userInfo.create_time;

    if (userInfo.update_time) {
      this.updateTime = userInfo.update_time;
    }
  }
}

class LoginSuccessModel {
  constructor(token) {
    this.token = token;
  }
}

class LoginCacheModel {
  constructor(userInfo, token, hash) {
    this.hash = hash;
    this.token = token;
    this.user = userInfo;
    this.createTime = new Date().toUTCString();
  }
}

module.exports = {
  LoginSuccessModel,
  LoginCacheModel,
  UserInfoModal,
};
