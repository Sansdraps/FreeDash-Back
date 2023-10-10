const User = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const registerController = {
    handleRegister: async (req, res) => {
        // On intercepte dans le corps de requête les informations entrées par l'utilisateur
        const { firstName, lastName, email, password } = req.body;

        // On vérifie que l'utilisateur n'existe pas déjà

        // Requête SQL correspondante: 'SELECT * FROM "user" WHERE email = ${email};'
        const existentUser = await User.findOne({
            where: {
                email
            }
        });

        // Si l'utilisateur existe déjà, on renvoie un message d'erreur
        if (existentUser) return res.status(409).send("Un utilisateur existe déjà pour cette adresse email.");

        try {
            // On hache le mot de passe grâce à Bcrypt: ici, on lui passe 10 tours de hachage
            const encryptedPassword = await bcrypt.hash(password, 10);

            // On créé l'utilisateur et on l'enregistre en BDD

            // Requête SQL correspondante: 'INSERT INTO "user" (firstname, lastname, email, password) VALUES (${firstName}, ${lastName}, ${email}, ${encryptedPassword});'
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: encryptedPassword
            });

            // On récupère l'id de l'utilisateur généré automatiquement (grâce à l'autoincrémentation) pour l'utiliser dans le message de confirmation
            const userId = newUser.id;

            // On renvoie un message de confirmation
            res.status(201).send(`Nouvel utilisateur ${firstName} ${lastName} créé avec succès! Il possède l'identifiant ${userId}.`);

        // Si quelque chose ne va pas, on renvoie le code d'erreur 500 (erreur serveur)
        } catch (error) {
            res.status(500).send("Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.");
        }
    }
}

// Export du module
module.exports = registerController;
