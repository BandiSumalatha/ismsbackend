import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import Cameras from "../camera/camera.model.js";
const Imprest = sequelize.define("imprest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  serialNo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Q2HV-96VV-VN8N",
  },
  description: {
    type: DataTypes.STRING(256),
  },
  phone_number_1: {
    type: DataTypes.STRING,
  },
  extension_1: {
    type: DataTypes.STRING(5),
  },
  phone_number_2: {
    type: DataTypes.STRING,
  },
  extension_2: {
    type: DataTypes.STRING(5),
  },
  cameras: {
    type: DataTypes.STRING(256),
  },
  serial_number: {
    type: DataTypes.STRING(256),
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  modified_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
Imprest.belongsTo(Cameras, { foreignKey: 'cameras_id' });

export default Imprest;