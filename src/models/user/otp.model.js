// otp.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import User from "../../models/user/user.model.js";

const OTP = sequelize.define("otp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING(6), 
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});
OTP.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
export default OTP;
