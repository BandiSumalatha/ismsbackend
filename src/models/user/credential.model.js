import { DataTypes } from "sequelize"
import sequelize from "../../config/db.config.js";
import Hospital from "../hospital/hospital.model.js";
import User from "../../models/user/user.model.js";
import OTP from "./otp.model.js";

const UserCredentials = sequelize.define("user_credentials", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  hash_key: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  last_login_date: {
    type: DataTypes.STRING(100),
  },
  locked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
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
UserCredentials.belongsTo(Hospital, { foreignKey: "hospital_id" }); 
UserCredentials.belongsTo(User, { foreignKey: "user_id" });
UserCredentials.hasMany(OTP, { foreignKey: "user_id" }); 

export default UserCredentials;