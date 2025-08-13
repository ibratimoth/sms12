const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Assessment = sequelize.define( 'Assessment', {
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
     term_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'assessments',
    underscored: true,
    timestamps: false
  })
  Assessment.associate = models => {
    Assessment.belongsTo(models.Term, {foreignKey: 'term_id'})
    Assessment.hasMany(models.Examination, {foreignKey: 'assessment_id'})
  }
  return Assessment;
}

