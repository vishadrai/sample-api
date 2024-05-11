const Error = require("../common/error");
const { limitIndexCheck } = require("../common/common-util");
const { logger } = require("../logger");
const { getPaginatedDomains } = require("../dao/domain");

const getDomains = async (req, res, next) => {
  const { limit, pageIndex, sort, order, searchText } = req.body;
  try {
    if (limit && pageIndex && limitIndexCheck(limit, pageIndex))
      return res.sendStatus(400);
    const { userInfo } = req.headers;
    const result = await getPaginatedDomains(
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
  getDomains,
};
