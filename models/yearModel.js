const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = () => {
  const Year = sequelize.define('Year', {
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
    is_active: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    }
  }, {
    tableName: 'years',
    underscored: true,
    timestamps: false,
    validate: {
      dateOrder() {
        if (this.start_date >= this.end_date) {
          throw new Error('Start date must be before end date');
        }
      }
    }
  });

  Year.associate = models => {
    Year.hasMany(models.Class, { foreignKey: 'year_id' });
  };

  return Year;
};
