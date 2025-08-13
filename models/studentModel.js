const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    first_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    middle_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    last_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    birth_date: { 
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    stream_id: { 
        type: DataTypes.UUID,
        allowNull: false 
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false 
    },
  }, {
    tableName: 'students',
    underscored: true,
    timestamps: false
  });
  Student.associate = models => {
    Student.belongsTo(models.Stream, {foreignKey: 'stream_id'})
  }
  return Student;
};
