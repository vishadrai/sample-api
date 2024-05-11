const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const nocache = require("nocache");

const env = require("./env");
const { logger } = require("./logger");
const baseRouter = require("./router/base-router");
const { notFound, handleError } = require("./common/error-handler");
const sequelize = require("./sequelize");

const app = new express();
app.use(express.json({ limit: "30mb" }));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/sample", nocache());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https:", "'unsafe-inline'"],
        baseUri: ["'self'"],
        blockAllMixedContent: [],
        fontSrc: ["'self'", "https:", "data:"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'", "https:", "'unsafe-inline'"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

baseRouter.mainRoute(app, logger);

app.use(notFound);
app.use(handleError);

const service = {
  async run() {
    await app.listen(env.PORT);
    console.log(
      `Express server listening on port ${env.PORT} in ${app.get("env")} mode`
    );
  },
};

sequelize.authenticateSql();

service.run().catch((err) => {
  console.log("Error starting server", err);
  process.exit(1);
});
