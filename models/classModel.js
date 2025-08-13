const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Class = sequelize.define('Class', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
     capacity: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    year_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },{
    tableName: 'classes',
    underscored: true,
    timestamps: false
  })
  Class.associate = models => {
    Class.belongsTo(models.Year, {foreignKey: 'year_id'})
    Class.hasMany(models.Stream, {foreignKey: 'class_id'})
    Class.hasMany(models.Subject, {foreignKey: 'class_id'})
  }
  return Class
}
