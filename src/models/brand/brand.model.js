import DataTypes from 'sequelize'
import sequelize from '../../config/db.config.js'
import Hospital from '../hospital/hospital.model.js'

const Brand = sequelize.define('brand', {
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
Brand.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default Brand;