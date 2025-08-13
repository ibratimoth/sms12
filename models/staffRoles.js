const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const staffRoles = sequelize.define('staffroles', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    staff_id: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'staffroles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = staffRoles;