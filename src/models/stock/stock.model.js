import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import Hospital from "../hospital/hospital.model.js";

const Stock = sequelize.define("stock", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  totalObjects: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalBoxes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  barcodes: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Stock.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default Stock;
