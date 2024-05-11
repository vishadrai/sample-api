const Error = require("../common/error");
const { limitIndexCheck } = require("../common/common-util");
const { logger } = require("../logger");
const { getKPIsBySubDomainId } = require("../dao/kpi");

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
    next(new Error(exception.code, "getAllKPIsBySubDomainId failed"));
  }
};

module.exports = {
  getAllKPIsBySubDomainId,
};
