class APIError extends APIError {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  statusCode() {
    return this.statusCode;
  }
}

module.exports = APIError;
