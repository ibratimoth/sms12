const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Examination = sequelize.define( 'Examination', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    start_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    end_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
      assessment_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'examinations',
    underscored: true,
    timestamps: false
  })
  Examination.associate = models => {
    Examination.belongsTo(models.Assessment, {foreignKey: 'assessment_id'})
  }
  return Examination;
}

