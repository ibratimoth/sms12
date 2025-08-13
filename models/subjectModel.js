const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Subject = sequelize.define('subjects', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { 
    tableName: 'subjects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 });

module.exports = Subject;