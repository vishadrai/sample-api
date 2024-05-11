const env = require("../env");

const limitIndexCheck = (limit, index = 1, moduleLimit = null) => {
  try {
    limit = +limit;
    index = +index;

    if (!Number.isInteger(limit) || !Number.isInteger(index)) {
      return true;
    }
    let checkValue = false;
    if (moduleLimit) {
      checkValue = limit > moduleLimit;
    } else {
      checkValue = limit > 100;
    }
    return checkValue;
  } catch (exception) {
    return true;
  }
};

module.exports = {
  limitIndexCheck,
};
