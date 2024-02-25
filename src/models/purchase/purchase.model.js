import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Hospital from '../hospital/hospital.model.js';
import Product from '../product/product.model.js';
import Imprest from '../imprest/imprest.model.js';

const Purchase = sequelize.define('purchase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    initiated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    received: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    shipped: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    purchaseOrderId: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
});

Purchase.belongsTo(Imprest, { foreignKey: 'imprest_id' });
Purchase.belongsTo(Product, { foreignKey: 'product_id' });
Purchase.belongsTo(Hospital, { foreignKey: "hospital_id" });

export default Purchase;
