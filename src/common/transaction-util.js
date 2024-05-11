const { logger } = require("../logger");

const rollBackTransaction = async (transaction) => {
  try {
    if (
      transaction &&
      transaction.finished &&
      (transaction.finished !== "rollback" || transaction.finished !== "commit")
    ) {
      await transaction.rollback();
    }
    return true;
  } catch (exception) {
    logger.error("Transaction rollback failed: ", exception);
    return false;
  }
};

module.exports = {
  rollBackTransaction,
};
