const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    handleLogin : async (req, res) => {

        // On intercepte dans le corps de requête l'email et le mot de passe entrés par l'utilisateur dans le formulaire
        const { email, password } = req.body;
        
        // On cherche en BDD un utilisateur possédant l'email entré dans le login

        // Requête SQL correspondante: 'SELECT * FROM "user" WHERE email = ${email};'
        const foundUser = await User.findOne({
                    where: {
                        email
                    }
                });

        // Si on ne trouve aucun utilisateur correspondant, on refuse l'accès
        if (!foundUser) return res.status(401).send("Email ou mot de passe incorrect.");

        // Contrôle du mot de passe
        const validPassword = await bcrypt.compare(password, foundUser.password);

        if (validPassword) {

            // Création du JWT
            const accessToken = jwt.sign(
                {
                    "id": foundUser.id,
                    // refreshToken: generatedRefreshToken
                },
                // On signe le JWT avec la clé secrète définie dans le fichier .env
                process.env.ACCESS_TOKEN_SECRET,

                // On définit la durée de validité du JWT
                { expiresIn: '10 days' }
            );


            // Envoi du JWT au front
            res.json({ accessToken });

        } else {
                res.status(401).send("Email ou mot de passe incorrect.");
        }
    }
};

module.exports = authController;
