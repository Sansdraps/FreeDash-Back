const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'firstname', // Nom de colonne réel dans la base de données
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'lastname', // Nom de colonne réel dans la base de données
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    zipCode: {
        type: DataTypes.INTEGER,
        field: 'zip_code',
    },
    country: {
        type: DataTypes.STRING,
    },
    occupation: {
        type: DataTypes.STRING,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
    },
    role: {
        type: DataTypes.STRING,
    },
    photoUrl: {
        type: DataTypes.STRING,
        field: 'photo_url',
    },
    siret: {
        type: DataTypes.BIGINT,
    },
    iban: {
        type: DataTypes.STRING,
    },
    bic: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    tableName: 'user',
});

module.exports = User;


/* TYPES:
- STRING: VARCHAR(255)
- INTEGER: INTEGER
- DATE: DATE
- DECIMAL(10, 2) : DECIMAL(10, 2)
- BOOLEAN : BOOLEAN

allowNull : est autorisé ou non à être égal à null
*/