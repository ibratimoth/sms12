const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RolesPermission = sequelize.define('rolespermissions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    permission_id: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'rolespermissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = RolesPermission;