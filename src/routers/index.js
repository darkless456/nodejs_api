const { get, isUndefined } = require('lodash');
const services = require('../services');
const guards = require('../guards');
const { ResponseModels } = require('../models');

const routers = {
  '/api/articles': {
    GET: {
      handler: ['articleService', 'getAllArticles'],
      guards: [],
    },
  },
  '/api/article': {
    GET: {
      handler: ['articleService', 'getArticleById', ['queryParams.id']],
      guards: [],
    },
    POST: {
      handler: ['articleService', 'addArticle', ['bodyData']],
      guards: [
        ['loginGuard', ['headers']],
      ],
    },
    PUT: {
      handler: ['articleService', 'updateArticle', ['bodyData']],
      guards: [
        ['loginGuard', ['headers']],
      ],
    },
    DELETE: {
      handler: ['articleService', 'deleteArticleById', ['queryParams.id']],
      guards: [
        ['loginGuard', ['headers']],
      ],
    },
  },
  '/api/login': {
    POST: {
      handler: ['userService', 'getUserTokenByAuth', ['bodyData.username', 'bodyData.password']],
      guards: [],
    },
  },
};

const resolveGuards = async (routerGuards, requestParams) => {
  const allGuards = routerGuards.map(async (guard) => {
    const [guardMethod, guardParams] = guard;
    let paramsList = [];
    if (guardParams && guardParams.length > 0) {
      paramsList = guardParams.map((param) => {
        return get(requestParams, param);
      });
    }
    const result = await guards[guardMethod].apply(null, paramsList);
    return result;
  });

  const results = await Promise.all(allGuards);
  const response = results.find((result) => result !== true);
  return response;
};

const resolveRouter = async (requestParams) => {
  const { method, path } = requestParams;

  const routerConfig = routers[path][method];

  let response;
  if (isUndefined(routerConfig)) {
    response = ResponseModels.InvalidPathModel();
  }

  const {
    guards: routerGuards, handler: [serviceName, serviceMethod, serviceMethodParams],
  } = routerConfig;

  if (isUndefined(response)) {
    response = await resolveGuards(routerGuards, requestParams);
  }

  if (isUndefined(response)) {
    let paramsList = [];
    if (serviceMethodParams && serviceMethodParams.length > 0) {
      paramsList = serviceMethodParams.map((param) => {
        return get(requestParams, param);
      });
    }
    response = await services[serviceName][serviceMethod].apply(null, paramsList);
  }

  return response;
};

module.exports = resolveRouter;
