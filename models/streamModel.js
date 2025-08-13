const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Stream = sequelize.define('Stream', {
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
    class_id: { 
        type: DataTypes.UUID,
        allowNull: false 
    }
  }, {
    tableName: 'streams',
    underscored: true,
    timestamps: false
  });
  Stream.associate = models => {
    Stream.belongsTo(models.Class, {foreignKey: 'class_id'})
  }
  return Stream;
};
