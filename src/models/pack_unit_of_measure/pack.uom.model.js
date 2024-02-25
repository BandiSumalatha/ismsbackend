import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Hospital from '../hospital/hospital.model.js';

const PackUnitOfMeasure = sequelize.define('pack_unit_of_measure', {
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

PackUnitOfMeasure.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default PackUnitOfMeasure;