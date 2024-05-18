const kpiService = require("../service/kpi-service");

const getAllKPIsBySubDomainId = (req, res, next) =>
  kpiService.getAllKPIsBySubDomainId(req, res, next);

const getFilteredKPIs = (req, res, next) =>
  kpiService.getFilteredKPIs(req, res, next);

module.exports = {
  getAllKPIsBySubDomainId,
  getFilteredKPIs
};
