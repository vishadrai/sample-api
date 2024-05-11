const subDomainService = require("../service/sub-domain-service");

const getSubDomainsByDomainId = (req, res, next) =>
  subDomainService.getSubDomainsByDomainId(req, res, next);

module.exports = {
  getSubDomainsByDomainId,
};
