const router = require("./api-router");
const env = require("../env");

const { API_END_POINT = "/api" } = env;

const mainRoute = (app, logger) => {
  router.route(API_END_POINT, app, logger);
};

module.exports = { mainRoute };
