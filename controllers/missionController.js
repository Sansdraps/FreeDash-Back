const Joi = require('joi');
const { Mission, Client } = require('../models');

const missionController = {
    // Récupérer toutes les missions, tous utilisateurs confondus
    getAllMissions: async (req, res) => {
        // On récupère les données de la BDD et on les envoie au front sous forme de JSON

        // Requête SQL correspondante: 'SELECT * FROM mission;'
        const missionData = await Mission.findAll();

        res.json(missionData);
    },
    // Récupérer toutes les missions d'un utilisateur donné
    getAllMissionsByUserId: async (req, res) => {
        // On intercepte dans l'URL l'id de l'utilisateur
        const userId = req.userId;

        // On récupère les données de la BDD et on les envoie au front sous forme de JSON

        // Requête SQL correspondante: 'SELECT * FROM mission WHERE user_id = ${userId};
        const missionData = await Mission.findAll({
            where: {
                userId
            }
        });

        res.json(missionData);
    },
    // Récupérer une seule mission
    getOneMissionById: async (req, res) => {
        // On intercepte dans l'URL l'id de la mission
        const { missionId } = req.params;
        const userId = req.userId;
        // On récupère les données de la BDD et on les envoie au front sous forme de JSON

        // Requête SQL correspondante: 'SELECT * FROM mission WHERE id = ${missionId};
        const foundMission = await Mission.findByPk(missionId);
        if (foundMission.user_id !== userId) {
            return res.status(401).send("Vous n'êtes pas autorisé à consulter cette mission.")
        } else {
            res.json(foundMission);
        }
    },
    getAllMissionsByClientId: async (req, res) => {
        // On intercepte dans l'URL l'id de l'user et du client
        const { clientId } = req.params;
        const userId = req.userId;

        // On récupère les données de la BDD et on les envoie au front sous forme de JSON

        // Requête SQL correspondante: 'SELECT * FROM mission WHERE user_id = ${userId} AND client_id = ${clientId}';
        const foundMissions = await Mission.findAll({
            where: {
                userId,
                clientId
            }
        })

        res.json(foundMissions);
    },
    createMission: async (req, res) => {
        // On intercepte dans le corps de requête les données envoyées par l'utilisateur
        const { name, startDate, endDate, status, totalPrice, tva, commentary, declarate, clientId } = req.body;

        // On intercepte dans l'URL l'id de l'utilisateur
        const userId = req.userId;

        // On récupère le client pour pouvoir passer ses nom et prénom dans la création de la mission

        // Requête SQL correspondante: 'SELECT * FROM client WHERE id = ${clientId}'
        const foundClient = await Client.findByPk(clientId);


        // On crée la mission en lui passant les données récupérées précédemment et on l'enregistre en BDD

        // Requête SQL correspondante: 'INSERT INTO mission (name, start_date, end_date, status, total_price, tva, commentary, declarate, client_id) VALUES (${name}, ${startDate}, ${endDate}, ${status}, ${totalPrice}, ${tva}, ${commentary), ${declarate}, ${clientId});'
        const createdMission = await Mission.create({
            name,
            startDate,
            endDate,
            status,
            totalPrice,
            tva,
            commentary,
            declarate,
            userId,
            clientId,
            clientFirstName: foundClient.firstName,
            clientLastName: foundClient.lastName
        });

        // On renvoie un message de confirmation
        res.status(200).send(`La mission "${createdMission.name}" a bien été créée, elle possède l'identifiant ${createdMission.id} et est affectée à ${createdMission.clientFirstName} ${createdMission.clientLastName}. Félicitations!`);
    },
    updateMission: async (req, res) => {
        // On intercepte dans l'URL l'id de la mission
        const { missionId } = req.params;
        const userId = req.userId;

        // On intercepte dans le corps de requête les informations mises à jour
        const { name, startDate, endDate, status, totalPrice, tva, commentary, declarate, clientId } = req.body;

        // On récupère le client pour pouvoir passer ses nom et prénom dans la création de la mission

        // Requête SQL correspondante: 'SELECT * FROM client WHERE id = ${clientId}'
        const foundClient = await Client.findByPk(clientId);


        // On met à jour les informations de la mission et on enregistre les modifications en BDD, puis on les renvoie au front sous forme de JSON
        if (foundClient.user_id !== userId) {
            return res.status(401).send("Vous n'êtes pas autorisé à modifier cette mission.")
        } else {

        // Requête SQL corespondante: 'UPDATE mission SET name = ${name}, start_date = ${startDate}, end_date = ${endDate}, status = ${status}, total_price = ${totalPrice}, tva = ${tva}, commentary = ${commentary}, declarate = ${declarate}, client_id = ${clientId} WHERE id = ${missionId};'
            const foundMission = await Mission.findByPk(missionId);

            foundMission.update({
                name,
                startDate,
                endDate,
                status,
                totalPrice,
                tva,
                commentary,
                declarate,
                clientId,
                clientFirstName: foundClient.firstName,
                clientLastName: foundClient.lastName
            });

            res.status(200).send(`La mission possédant l'identifiant ${foundMission.id} a bien été modifiée.`);
        }
    },
    deleteMission: async (req, res) => {
        // On intercepte dans l'URL l'id de la mission
        const { missionId } = req.params;
        const userId = req.userId;
        // On récupère la mission en BDD et on la supprime

        // Requête SQL correspondante: 'DELETE FROM mission WHERE id = ${missionId};
        const foundMission = await Mission.findByPk(missionId);
        if (foundMission.user_id == userId) {
            foundMission.destroy();

            // On renvoie un message de confirmation
            res.status(200).send(`La mission ${foundMission.name} a été supprimée avec succès.`);
        }
    }
};

// Export du module
module.exports = missionController;
