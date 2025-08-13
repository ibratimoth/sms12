const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const staff = sequelize.define('staffs', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    form_four_index_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disability_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    gender_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true  // 
    }
}, {
    tableName: 'staffs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = staff;