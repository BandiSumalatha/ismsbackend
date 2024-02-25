import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';


const Email = sequelize.define('email', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailtype: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    notificationType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alertMode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default Email;
