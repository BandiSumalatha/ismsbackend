import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Hospital from "../../models/hospital/hospital.model.js";

const GenericName = sequelize.define('generic_name', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

GenericName.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default GenericName;