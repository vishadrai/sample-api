const domainService = require('../service/domain-service');

const getDomains = (req, res, next) => domainService.getDomains(req, res, next);

module.exports = {
    getDomains
};
