const User = require('./user');
const Client = require('./client');
const Mission = require('./missions');
const MissionDetails = require('./missionDetails');

User.hasMany(Mission, {
    foreignKey: 'user_id',
    as: 'user'
});

Mission.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'mission'
});

User.hasMany(Client, {
    foreignKey: 'user_id',
    as: 'client'
});

Client.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

Client.hasMany(Mission, {
    foreignKey: 'client_id',
    as: 'mission'
});

Mission.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

Mission.hasMany(MissionDetails, {
    foreignKey: 'mission_id',
    as: 'missionDetails'
});

MissionDetails.belongsTo(Mission, {
    foreignKey: 'mission_id',
    as: 'mission'
});


module.exports = { Mission, User, Client, MissionDetails };
