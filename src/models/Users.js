const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Users = sequelize.define(
    'Users',
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        language_code: {
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
        tableName: 'users',
        timestamps: false,
    },
);

module.exports = Users;
