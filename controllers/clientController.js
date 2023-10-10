const Joi = require('joi');
const { Client, Mission } = require('../models');

const clientController = {
    getAllClients: async (req, res) => {
        // On récupère les données de la BDD et on les envoie au front

        // Requête SQL correspondante: 'SELECT * FROM client;'
            const clientData = await Client.findAll();
            res.json(clientData);
    },
    getClientsByUserId: async (req, res) => {
        // On intercepte dans l'URL l'id de l'utilisateur
        const userId = req.userId;

        // On récupère les données de la BDD et on les envoie au front sous forme de JSON
        // Requête SQL correspondante: 'SELECT * FROM client WHERE user_id = $1;' , [userId]
            const clientData = await Client.findAll({
                where: {
                    userId
                }
            });
            res.json(clientData);
    },
    getOneClientById: async (req, res) => {
        // On intercepte dans l'URL l'id du client
        const { clientId } = req.params;
        const userId = req.userId;
        // On récupère les données de la BDD et on les envoie au front sous forme de JSON

        // Requête SQL correspondante: 'SELECT * from client WHERE id = $1;', [userId] ;
            const foundClient = await Client.findByPk(clientId);
            if (foundClient.user_id === userId) {
                res.json(foundClient);
            } else {
                res.status(401).send("Vous n'avez pas accès à ce client, va te faire TRUAND");
            }
    },
    createClient: async (req, res) => {
        // On intercepte dans l'URL l'id de l'utilisateur
        const userId = req.userId;

        // On intercepte dans le corps de requête les données du formulaire entrées par l'utilisateur
        const { email, firstName, lastName, address, zipCode, city, country, phoneNumber, role, photoUrl, siret, provenance, commentary } = req.body;

        // On créé le nouveau client et on l'entre en BDD

        // Requête SQL correspondante: 'INSERT INTO client (email, firstname, lastname, address, zip_code, city, coutnry, phone_number, role, photo_url, siret, provenance, commentary) VALUES (${email}, ${firstName}, ${lastName}, ${address}, ${zipCode}, ${city}, ${country}, ${phoneNumber}, ${role}, ${photoUrl}, ${siret}, ${provenance}, ${commentary});

        const createClient = await Client.create({
            email,
            firstName,
            lastName,
            address,
            zipCode,
            city,
            country,
            phoneNumber,
            role,
            photoUrl,
            siret,
            provenance,
            commentary,
            userId
        });

        // On renvoie un message de confirmation
        res.status(200).send(`Le client ${firstName} ${lastName} a été créé avec succès. Il possède l'identifiant ${createClient.id}.`);
    },
    updateClient: async (req, res) => {
        // On intercepte l'id du client dans l'URL
        const { clientId } = req.params;

        const userId = req.userId;

        // On intercepte dans le corps de requête les informaitons mises à jour entrées par l'utilisateur
        const { email, firstName, lastName, address, zipCode, city, country, phoneNumber, role, photoUrl, siret, provenance, commentary } = req.body;

        // On met à jour le client existant et on enregistre les modifications en BDD

        // Requête SQL correspondante: 'SELECT * FROM client WHERE id = ${clientId};'
        const foundClient = await Client.findByPk(clientId);
        if (foundClient.user_id === userId) {
            const foundMission = await Mission.findAll({
                where: {
                    clientId
                }
            })

            // Requête SQL correspondante: 'UPDATE client SET email = ${email}, firstname = ${validatedDate.firstName}, lastname = ${lastName}, address = ${address}, zip_code = ${zipCode}, city = ${city}, country = ${country}, phone_number = ${phoneNumber}, role = ${role}, photo_url = ${photoUrl}, siret = ${siret}, provenance = ${provenance}, commentary = ${commentary} WHERE id = ${clientId};'
            await foundClient.update({
                email,
                firstName,
                lastName,
                address,
                zipCode,
                city,
                country,
                phoneNumber,
                role,
                photoUrl,
                siret,
                provenance,
                commentary
            });

            // On crée un tableau de promesses de mise à jour de missions
            const updateMissions = [];

            // On ajoute chaque promesse de mise à jour dans le tableau précédemment créé
            foundMission.forEach((mission) => {
                updateMissions.push(mission.update({
                    clientFirstName: firstName,
                    clientLastName: lastName
                }));
            })

            // Puis on exécute toutes ces promesses en asynchrone
            await Promise.all(updateMissions);

            // On renvoie un message de confirmation
            res.status(200).send(`Le client ${foundClient.firstName} ${foundClient.lastName} et ses missions ont été modifiés avec succès.`);
        }
    },
    deleteClient: async (req, res) => {
        // On intercepte l'id du client dans l'URL
        const { clientId } = req.params;
        const userId = req.userId;
        // On récupère le client existant en BDD et on le supprime

        // Requêtes SQL correspondantes: 'DELETE FROM mission WHERE client_id = ${clientId};'
        // 'DELETE * FROM client WHERE id = ${clientId};'
        const foundClient = await Client.findByPk(clientId);
        if (foundClient.user_id === userId) {
            const foundMission = await Mission.findAll({
                where: {
                    clientId
                }
            })

            // On supprime de la BDD le client et toutes ses missions

            // On crée un tableau de promesses de suppression de missions
            const deleteMissions = [];

            // On ajoute chaque promesse de suppression dans le tableau précédemment créé
            foundMission.forEach((mission) => {
                deleteMissions.push(mission.destroy());
            })

            // Puis on exécute toutes ces promesses en asynchrone
            await Promise.all(deleteMissions);

            // On finit par supprimer le client
            await foundClient.destroy();

            // On renvoie un message de confirmation
            res.status(200).send(`Le client ${foundClient.firstName} ${foundClient.lastName} et ses missions ont été supprimés avec succès.`);
        }
    }
};

// Export du module
module.exports = clientController;
