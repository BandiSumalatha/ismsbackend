import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Hospital from '../hospital/hospital.model.js';

const ProductForm = sequelize.define('product_form', {
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

ProductForm.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default ProductForm;
