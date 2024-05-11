const domainController = require('../controller/domain-controller');

const setDomainRouter = (routePath, app) => {
  app.post(`${routePath}/domains`, domainController.getDomains);
};

module.exports = {
  setDomainRouter,
};
