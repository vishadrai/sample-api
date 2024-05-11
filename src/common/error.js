class Error extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  statusCode() {
    return this.statusCode;
  }
}

module.exports = Error;
