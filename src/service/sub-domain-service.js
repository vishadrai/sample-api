const Error = require("../common/error");
const { limitIndexCheck } = require("../common/common-util");
const { logger } = require("../logger");
const { getSubDomainsListByDomainId } = require("../dao/sub-domain");

const getSubDomainsByDomainId = async (req, res, next) => {
  const { limit, pageIndex, sort, order, searchText } = req.body;
  const { id } = req.params;
  try {
    if (limit && pageIndex && limitIndexCheck(limit, pageIndex))
      return res.sendStatus(400);
    const { userInfo } = req.headers;
    const result = await getSubDomainsListByDomainId(
      id,
      pageIndex,
      limit,
      searchText,
      sort,
      order
    );
    res.status(200).send({ result });
  } catch (exception) {
    logger.error("getDomains failed");
    next(new Error(exception.code, "getDomains failed"));
  }
};

module.exports = {
  getSubDomainsByDomainId,
};
