const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Entity = sequelize.define('entities', {
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
    tableName: 'entities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 });

module.exports = Entity;