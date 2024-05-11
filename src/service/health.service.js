const Error = require("../common/error");

const { logger } = require("../logger");
const env = require("../env");

const checkHealth = async (req, res, next) => {
  try {
    res.status(200).send({ server_time: new Date() });
  } catch (exception) {
    logger.error("CheckHealth : Failed to connect", exception);
    next(new Error(exception.code, "checkHealth : System health check Failed"));
  }
};

module.exports = {
  checkHealth,
};
