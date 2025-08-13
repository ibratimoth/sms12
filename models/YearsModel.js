const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Year = sequelize.define('years', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'years',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


