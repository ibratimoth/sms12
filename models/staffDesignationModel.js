const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const staffDesignation = sequelize.define('staffdesignations', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    staff_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    designation_id: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'staffdesignations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = staffDesignation;