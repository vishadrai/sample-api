const healthRouter = require("./health-router");
const domainRouter = require("./domain-router");
const subDomainRouter = require("./sub-domain-router");
const kpiRouter = require("./kpi-router");

const uuid = require("uuid").v4;

const route = (routePath, app, logger) => {
  healthRouter.setHealthRouter(routePath, app);
  app.use((req, res, next) => {
    const { userInfo } = req.headers;
    req.headers.uuid = uuid();
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const logRequest = logger.child(
      {
        uuid: req.headers.uuid,
        type: "request",
        body: JSON.stringify(req.body),
        method: req.method,
        url: req.url,
        email: userInfo && userInfo.email ? userInfo.email : "",
        IP: ip,
      },
      true
    );
    logRequest.info("Request received");

    const afterResponse = () => {
      res.removeListener("finish", afterResponse);
      res.removeListener("close", afterResponse);
      const logResponse = logger.child(
        {
          uuid: req.headers.uuid,
          type: "response",
          status_code: res.statusCode,
          email: userInfo && userInfo.email ? userInfo.email : "",
        },
        true
      );
      logResponse.info("Response sent");
    };

    res.on("finish", afterResponse);
    res.on("close", afterResponse);
    res.on("end", afterResponse);

    next();
  });
  domainRouter.setDomainRouter(routePath, app);
  subDomainRouter.setSubDomainRouter(routePath, app);
  kpiRouter.setKPIRouter(routePath, app);
};

module.exports = { route };
