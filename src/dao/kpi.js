const KPI = require("../models/KPI");
const { logger } = require("../logger");
const transactionUtil = require("../common/transaction-util");
const APIError = require("../common/error");
const { sequelize } = require("../sequelize");
const { Op } = require("sequelize");

const getKPIsBySubDomainId = async (
  subDomainId,
  page,
  pageSize,
  searchTerm = "",
  sortField = "kpi_name",
  sortOrder = "ASC"
) => {
  const transaction = await sequelize.transaction();
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const whereCondition = {
      sub_domain_id: subDomainId,
      ...(searchTerm && {
        kpi_name: {
          [Op.like]: "%" + searchTerm + "%",
        },
      }),
    };

    const result = await KPI.findAndCountAll({
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
    logger.error("getKPIs - Get KPIs failed ", exception);
    throw new APIError(exception.code, "getKPIs : Failed to get KPIs");
  }
};

module.exports = {
  getKPIsBySubDomainId,
};
