const kpiController = require("../controller/kpi-controller");

const setKPIRouter = (routePath, app) => {
  app.post(
    `${routePath}/kpi/by/subdomain/:id`,
    kpiController.getAllKPIsBySubDomainId
  );
};

module.exports = {
  setKPIRouter,
};
