const kpiService = require("../service/kpi-service");

const getAllKPIsBySubDomainId = (req, res, next) =>
  kpiService.getAllKPIsBySubDomainId(req, res, next);

module.exports = {
  getAllKPIsBySubDomainId,
};
