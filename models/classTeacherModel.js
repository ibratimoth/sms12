const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const classTeacher = sequelize.define('classteachers', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    class_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    staff_id: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'classteachers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = classTeacher;