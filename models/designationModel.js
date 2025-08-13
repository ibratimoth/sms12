const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Designation = sequelize.define('designations', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
}, {
  tableName: 'designations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Designation;