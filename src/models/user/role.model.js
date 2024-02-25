import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import Hospital from "../hospital/hospital.model.js";

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(256),
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
},
modified_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
}
});

Role.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default Role;
