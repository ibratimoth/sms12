const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Term = sequelize.define('Term', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    year_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },{
    tableName: 'terms',
    underscored: true,
    timestamps: false
  })
  Term.associate = models => {
    Term.belongsTo(models.Year, {foreignKey: 'year_id'})
    Term.hasMany(models.Assessment, { foreignKey: 'term_id' });
  }
  return Term
}
