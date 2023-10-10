const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User, Mission, Client } = require('../models');

const userController = {
    getUserInfo: async (req, res) => {
        // On récupère les données de l'utilisateur en BDD et on les renvoie au front sous forme de JSON

        // Requête SQL correspondante: 'SELECT * FROM "user" WHERE id = ${userId};'
       
        // On intercepte dans l'URL l'id de l'utilisateur
        const userId = req.userId;

        const foundUser = await User.findByPk(userId);

        res.json(foundUser);        
    },
    updateUserInfo: async (req, res) => {
        // On intercepte dans l'URL l'id de l'utilisateur
        const userId = req.userId;

        // On intercepte dans le corps de requête les informations mises à jour par l'utilisateur
        const { email, firstName, lastName, address, zipCode, city, country, occupation, phoneNumber, role, photoUrl, siret, iban, bic } = req.body;

        // On récupère les données de l'utilisateur en BDD, on les met à jour et on enregistre les modifications en BDD
        // Puis on renvoie les données au front sous forme de JSON


        // Requête SQL correspondante: 'UPDATE "user" SET email = ${email}, firstname = ${firstName}, lastname = ${lastName}, zip_code = ${zipCode}, city = ${city}, country = ${country}, phone_number = ${phoneNumber}, role = ${role}, photo_url = ${photoUrl}, siret = ${siret}, iban = ${iban}, bic = ${bic} WHERE id = ${userId};'
        const foundUser = await User.findByPk(userId);

        foundUser.update({
            email,
            firstName,
            lastName,
            address,
            zipCode,
            city,
            country,
            occupation,
            phoneNumber,
            role,
            photoUrl,
            siret,
            iban,
            bic
        });

        res.json(foundUser);
    },
    updateUserPassword : async (req, res) => {
        // On intercepte dans l'URL l'id de l'utilisateur
        const userId = req.userId;

        // On intercepte dans le corps de requête le mot de passe mis à jour par l'utilisateur
        const { currentPassword, confirmPassword } = req.body;

        // On vérifie que le mot de passe entré est correct
        const foundUser = await User.findByPk(userId);

        const validPassword = await bcrypt.compare(currentPassword, foundUser.password);

        // Si il est correct, on peut le modifier

        // Requête SQL corrspondante: 'UPDATE "user" SET password = ${encryptedPassword} WHERE id = ${userId};'
        if (!validPassword) {
            res.status(401).send("Mot de passe incorrect.");
        } else {
            // On hache le nouveau mot de passe: ici, on lui passe 10 tours de hachage
            const encryptedPassword = await bcrypt.hash(confirmPassword, 10);

            const updateUser = await foundUser.update({
                password: encryptedPassword
            });

            // Pour finir, on renvoie un message de confirmation
            res.status(200).send(`L'utilisateur ${foundUser.firstName} ${foundUser.lastName} a été modifié avec succès.`);
        };
    },
    deleteUser: async (req, res) => {

        // On intercepte l'id de l'utilisateur dans l'URL
        const userId = req.userId;

        // On récupère l'utilisateur existant en BDD et on le supprime

        // Requêtes SQL correspondantes: 'DELETE FROM mission WHERE user_id = ${userId};'
        // 'DELETE FROM client WHERE user_id = ${userId};'
        // 'DELETE FROM user WHERE id = ${userId};'
        const foundUser = await User.findByPk(userId);
        const foundMission = await Mission.findAll({
            where: {
                userId
            }
        });
        const foundClient = await Client.findAll({
            where: {
                userId
            }
        });

        // On supprime de la BDD l'utilisateur, tous ses clients et toutes ses missions

        // On créé un tableau de promesses de suppression de clients
        const deleteClients = [];

        // On ajoute chaque promesse de suppression dans le tableau précédemment créé
        foundClient.forEach((client) => {
            deleteClients.push(client.destroy());
        })

        // Puis on exécute toutes ces promesses en asynchrone
        await Promise.all(deleteClients);

        // On crée un tableau de promesses de suppression de missions
        const deleteMissions = [];

        // On ajoute chaque promesse de suppression dans le tableau précédemment créé
        foundMission.forEach((mission) => {
            deleteMissions.push(mission.destroy());
        })

        // Puis on exécute toutes ces promesses en asynchrone
        await Promise.all(deleteMissions);

        // On finit par supprimer l'utilisateur
        await foundUser.destroy();

        // On renvoie un message de confirmation
        res.status(200).send(`L'utilisateur ${foundUser.firstName} ${foundUser.lastName} et ses missions ont été supprimés avec succès.`);
    }
};

// Export du module
module.exports = userController;
