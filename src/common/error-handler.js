const {
  NOT_FOUND_MESSAGE,
  NOT_FOUND_CODE,
  VALID_STATUS_CODES,
  DEFAULT_ERROR_STATUS_CODE,
} = require('./error-constants');

const notFound = (req, res, next) => {
  const error = new APIError(NOT_FOUND_MESSAGE);
  error.statusCode = NOT_FOUND_CODE;
  next(error);
};

// eslint-disable-next-line no-unused-vars
const handleAPIError = (err, req, res, next) => {
  res.status(VALID_STATUS_CODES.includes(err.statusCode) ? err.statusCode : DEFAULT_ERROR_STATUS_CODE);
  res.send({
    error: err.message,
  });
};

module.exports = {
  handleAPIError,
  notFound,
};
