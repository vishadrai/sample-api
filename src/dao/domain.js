const Domain = require("../models/Domain");
const { logger } = require("../logger");
const transactionUtil = require("../common/transaction-util");
const APIError = require("../common/error");
const { sequelize } = require("../sequelize");
const { Op } = require("sequelize");

const getPaginatedDomains = async (
  page,
  pageSize,
  searchTerm = "",
  sortField = "domain_name",
  sortOrder = "ASC"
) => {
  const transaction = await sequelize.transaction();
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const whereCondition = searchTerm
      ? {
          domain_name: {
            [Op.like]: "%" + searchTerm + "%",
          },
        }
      : {};

    const result = await Domain.findAndCountAll({
      where: whereCondition,
      order: [[sortField, sortOrder]],
      offset: offset,
      limit: limit,
    });
    return {
      data: result.rows,
      page: page,
      pageSize: pageSize,
      totalCount: result.count,
    };
  } catch (exception) {
    await transactionUtil.rollBackTransaction(transaction);
    logger.error("getDomains - Get domains failed ", exception);
    throw new APIError(exception.code, "getDomains : Failed to get domains");
  }
};

module.exports = {
  getPaginatedDomains,
};
