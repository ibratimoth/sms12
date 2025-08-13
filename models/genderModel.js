const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Gender = sequelize.define('genders', {
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
    tableName: 'genders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 });

module.exports = Gender;