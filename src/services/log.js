const { writeLog } = require('../utils/log');

const writeAccessLog = (request) => {
  const {
    method, url, headers, socket: { remoteAddress },
  } = request;

  const now = new Date().toUTCString();
  const log = `${now}, To: ${method} ${headers.host}${url}, From ${headers['user-agent']} IP ${remoteAddress} ContentType: ${headers['content-type']}`;

  writeLog('access.log', log);
};

module.exports = {
  writeAccessLog,
};
