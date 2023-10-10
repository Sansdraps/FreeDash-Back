const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Client extends Model {}

Client.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'firstname', // Nom de colonne réel dans la base de données
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'lastname', // Nom de colonne réel dans la base de données
    },
    address: {
        type: DataTypes.STRING
    },
    zipCode: {
        type: DataTypes.INTEGER,
        field: 'zip_code',
    },
    city: {
        type: DataTypes.STRING,
    },
    country: {
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
    provenance: {
        type: DataTypes.STRING,
    },
    commentary: {
        type: DataTypes.TEXT,
    },
    userId: {
        type: DataTypes.INTEGER,
        tableName: 'user_id'
    }
}, {
    sequelize,
    tableName: 'client',
});

module.exports = Client;


/* TYPES:
- STRING: VARCHAR(255)
- INTEGER: INTEGER
- DATE: DATE
- DECIMAL(10, 2) : DECIMAL(10, 2)
- BOOLEAN : BOOLEAN

allowNull : est autorisé ou non à être égal à null
*/