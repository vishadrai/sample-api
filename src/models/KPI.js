const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const KPI = sequelize.define(
    'KPI',
    {
        kpi_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        sub_domain_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        kpi_name: {
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
        tableName: 'kpi',
        timestamps: false,
    },
);

module.exports = KPI;
