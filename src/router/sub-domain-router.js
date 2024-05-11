const subDomainController = require("../controller/sub-domain-controller");

const setSubDomainRouter = (routePath, app) => {
  app.post(
    `${routePath}/subdomain/by/domain/:id`,
    subDomainController.getSubDomainsByDomainId
  );
};

module.exports = {
  setSubDomainRouter,
};
