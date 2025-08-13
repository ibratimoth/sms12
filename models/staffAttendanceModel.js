const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StaffAttendance = sequelize.define('staff_attendances', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    staff_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    isPresent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    check_in_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    check_out_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'staff_attendances',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = StaffAttendance;
