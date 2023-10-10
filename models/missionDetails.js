const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class MissionDetails extends Model {}

MissionDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    missionId: {
        type: DataTypes.INTEGER,
        field: 'mission_id'
    }
}, {
    sequelize,
    tableName: 'mission_details',
});

module.exports = MissionDetails;


/* TYPES:
- STRING: VARCHAR(255)
- INTEGER: INTEGER
- DATE: DATE
- DECIMAL(10, 2) : DECIMAL(10, 2)
- BOOLEAN : BOOLEAN

allowNull : est autorisé ou non à être égal à null
*/