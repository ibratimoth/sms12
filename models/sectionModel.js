const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Section = sequelize.define('sections', {
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
    tableName: 'sections',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 });

module.exports = Section;