const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Domain = sequelize.define(
    'Domain',
    {
        domain_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        domain_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domain_details: {
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
        tableName: 'domain',
        timestamps: false,
    },
);

module.exports = Domain;
