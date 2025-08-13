const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    code: { 
        type: DataTypes.STRING(32), 
        allowNull: false, 
        unique: true 
    },
    is_optional: { 
        type: DataTypes.BOOLEAN, 
        allowNull: true, 
        defaultValue: true 
    },
     class_id: { 
        type: DataTypes.UUID,
        allowNull: false 
    }
  }, {
    tableName: 'subjects',
    underscored: true,  
    timestamps: false
  });
  Subject.associate = models => {
    Subject.belongsTo(models.Class, {foreignKey: 'class_id'})
  }
  return Subject;
};
