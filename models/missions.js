const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Mission extends Model {}

Mission.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    startDate: {
        type: DataTypes.DATE,
        field: 'start_date', // Nom de colonne réel dans la base de données
    },
    endDate: {
        type: DataTypes.DATE,
        field: 'end_date', // Nom de colonne réel dans la base de données
    },
    status: {
        type: DataTypes.STRING,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'total_price', // Nom de colonne réel dans la base de données
    },
    tva: {
        type: DataTypes.DECIMAL(10, 2),
    },
    commentary: {
        type: DataTypes.TEXT,
    },
    declarate: {
        type: DataTypes.BOOLEAN,
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
    },
    clientId: {
        type: DataTypes.INTEGER,
        field: 'client_id'
    },
    clientFirstName: {
        type: DataTypes.STRING,
        field: 'client_firstname'
    },
    clientLastName: {
        type: DataTypes.STRING,
        field: 'client_lastname'
    }
}, {
    sequelize,
    tableName: 'mission',
});

module.exports = Mission;


/* TYPES:
- STRING: VARCHAR(255)
- INTEGER: INTEGER
- DATE: DATE
- DECIMAL(10, 2) : DECIMAL(10, 2)
- BOOLEAN : BOOLEAN

allowNull : est autorisé ou non à être égal à null
*/