import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';


const MerakiMotionAlerts = sequelize.define('motionalerts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  organizationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  networkId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deviceSerial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alertId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  alertType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occurredAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  alertTypeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alertLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default MerakiMotionAlerts;
