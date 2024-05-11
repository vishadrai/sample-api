/* eslint-disable no-console */
const { Sequelize } = require("sequelize");
const { logger } = require("./logger");
const env = require("./env");

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

const sequelize = new Sequelize(
  env.TEST_DB_NAME,
  env.TEST_DB_USER,
  env.TEST_DB_PASSWORD,
  {
    host: env.SERVER,
    dialect: env.DB,
    pool: {
      max: parseInt(30),
      min: parseInt(10),
      acquire: 30000,
      idle: 10000,
    },
    logging:
      env.SEQUILIZE_LOG_ENABLE === "true"
        ? (msg) => {
            logger.info(msg);
          }
        : null,
  }
);

const authenticateSql = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "MYSQL database Connection established successfully through sequelize."
    );
  } catch (error) {
    console.error("Failed to connect to mysql through sequelize");
  }
};

module.exports = {
  sequelize,
  authenticateSql,
};
