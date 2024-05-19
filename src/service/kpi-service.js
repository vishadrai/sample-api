const APIError = require("../common/error");
const { limitIndexCheck } = require("../common/common-util");
const { logger } = require("../logger");
const { getKPIsBySubDomainId, getKPIs } = require("../dao/kpi");

const getAllKPIsBySubDomainId = async (req, res, next) => {
  const { limit, pageIndex, sort, order, searchText } = req.body;
  const { id } = req.params;
  try {
    if (limit && pageIndex && limitIndexCheck(limit, pageIndex))
      return res.sendStatus(400);
    const { userInfo } = req.headers;
    const result = await getKPIsBySubDomainId(
      id,
      pageIndex,
      limit,
      searchText,
      sort,
      order
    );
    res.status(200).send({ result });
  } catch (exception) {
    logger.error("getAllKPIsBySubDomainId failed");
    next(new APIError(exception.code, "getAllKPIsBySubDomainId failed"));
  }
};

const getFilteredKPIs = async (req, res, next) => {
  const { limit, pageIndex, sort, order, searchText, subdomains } = req.body;
  try {
    if (limit && pageIndex && limitIndexCheck(limit, pageIndex))
      return res.sendStatus(400);
    const result = await getKPIs(
      subdomains,
      pageIndex,
      limit,
      searchText,
      sort,
      order
    );
    res.status(200).send({ result });
  } catch (exception) {
    console.log("Ex", exception)
    next(new APIError(exception.code, "getFilteredKPIs failed"));
  }
};


module.exports = {
  getAllKPIsBySubDomainId,
  getFilteredKPIs
};
