import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';


const ObjectCountTable = sequelize.define('objectCount', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serialNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    objectCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shelf: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default ObjectCountTable;
