const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const SubDomain = sequelize.define(
  "SubDomain",
  {
    sub_domain_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    domain_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_domain_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_domain_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    update_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "sub_domain",
    timestamps: false,
  }
);

module.exports = SubDomain;
