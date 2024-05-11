const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelize');

const UserInstance = sequelize.define(
  'UserInstance',
  {
    user_instance_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_default_tenant: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    create_by: {
      type: DataTypes.INTEGER,
    },
    update_by: {
      type: DataTypes.INTEGER,
    },
    create_date: {
      type: DataTypes.DATE,
    },
    update_date: {
      type: DataTypes.DATE,
    }
  },
  {
    tableName: 'user_instance',
    timestamps: false,
  },
);

module.exports = UserInstance;
