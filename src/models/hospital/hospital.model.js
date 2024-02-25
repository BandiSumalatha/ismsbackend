import DataTypes from 'sequelize';
import sequelize from '../../config/db.config.js';

const Hospital = sequelize.define('hospital', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Hospital;