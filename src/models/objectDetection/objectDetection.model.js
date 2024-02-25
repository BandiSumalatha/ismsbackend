import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';


const ObjectDetection = sequelize.define('objectDetection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serialNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logs: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logStatus: {
        type: DataTypes.BOOLEAN,
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

export default ObjectDetection;
