import { DataTypes } from "sequelize";
import Role from "../../models/user/role.model.js";
import User from "../../models/user/user.model.js";
import Imprest from "../imprest/imprest.model.js";
import Hospital from "../hospital/hospital.model.js";
import sequelize from "../../config/db.config.js";

const UserRole = sequelize.define("user_role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  },
});


UserRole.belongsTo(Role, { foreignKey: "role_id" });
UserRole.belongsTo(User, { foreignKey: "user_id" });
UserRole.belongsTo(Imprest, { foreignKey: "imprest_id" });
UserRole.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default UserRole;