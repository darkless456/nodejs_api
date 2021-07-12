const { writeAccessLog } = require('./src/services/log');
const requestUtils = require('./src/utils/request');

const app = async (request, response) => {
  writeAccessLog(request);

  const { method, url, headers } = request;

  const bodyData = await requestUtils.getBodyData(request);

  const responseData = await requestUtils.handleRouter({
    url, method, bodyData, headers,
  });

  response.setHeader('Content-type', 'application/json');
  response.end(JSON.stringify(responseData));
};

module.exports = app;
