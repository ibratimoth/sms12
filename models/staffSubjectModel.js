const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const staffSubject = sequelize.define('staffsubjects', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    subject_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    staff_id: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'staffsubjects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = staffSubject;