const SubDomain = require("../models/SubDomain");
const { logger } = require("../logger");
const transactionUtil = require("../common/transaction-util");
const Error = require("../common/error");
const { sequelize } = require("../sequelize");
const { Op } = require("sequelize");

const getSubDomainsListByDomainId = async (
  domainId,
  page,
  pageSize,
  searchTerm = "",
  sortField = "sub_domain_name",
  sortOrder = "ASC"
) => {
  const transaction = await sequelize.transaction();
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const whereCondition = {
      domain_id: domainId,
      ...(searchTerm && {
        sub_domain_name: {
          [Op.like]: "%" + searchTerm + "%",
        },
      }),
    };

    const result = await SubDomain.findAndCountAll({
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
    logger.error("getSubDomains - Get subdomains failed ", exception);
    throw new Error(exception.code, "getSubDomains : Failed to get subdomains");
  }
};

module.exports = {
  getSubDomainsListByDomainId,
};
