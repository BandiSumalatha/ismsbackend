import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import PackUnitOfMeasure from '../pack_unit_of_measure/pack.uom.model.js';
import UnitOfMeasure from '../unit_of_measure/unitof.measure.model.js';
import ProductForm from "../product_form/product.form.model.js";
import Brand from "../brand/brand.model.js";
import GenericName from "../generic_name/generic.name.model.js";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    strength: DataTypes.STRING,
    short_code: {
        type: DataTypes.STRING(15),
        unique: true,
    },
    pack_size: DataTypes.INTEGER,
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    purchaseTriggered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
});

Product.belongsTo(PackUnitOfMeasure, { foreignKey: 'pack_uom_id' });
Product.belongsTo(UnitOfMeasure, { foreignKey: 'measure_id' });
Product.belongsTo(ProductForm, { foreignKey: 'product_form_id' });
Product.belongsTo(Brand, { foreignKey: 'brand_id' });
Product.belongsTo(GenericName, { foreignKey: 'generic_id' });

export default Product;