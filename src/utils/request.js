const queryString = require('query-string');
const resolveRouter = require('../routers');

const handleRouter = async (request) => {
  const {
    method, url, bodyData, headers,
  } = request;
  const splittedUrl = url.split('?');
  const path = splittedUrl[0];
  const rawQueryString = splittedUrl[1] || '';

  const queryParams = queryString.parse(rawQueryString);

  const requestParams = {
    method, path, queryParams, bodyData, headers,
  };

  const responseData = await resolveRouter(requestParams);
  return responseData;
};

const getBodyData = (request) => {
  return new Promise((resolve) => {
    const { method, headers } = request;
    let bodyData = '';
    if ((method === 'POST' || method === 'PUT') && headers['content-type'] === 'application/json') {
      request.on('data', (chunk) => {
        bodyData += chunk.toString();
      });

      request.on('end', async () => {
        resolve(JSON.parse(bodyData));
      });
    } else {
      resolve({});
    }
  });
};

module.exports = {
  handleRouter,
  getBodyData,
};
