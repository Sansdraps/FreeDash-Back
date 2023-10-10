// On appelle le fichier dotenv pour avoir accès aux variables d'environnement
require('dotenv').config();

const cors = require('cors');
const corsOptions = {
  origin: [process.env.CORS_ACCEPTED_URL, 'http://localhost:5173']
};
const path = require('path');
const express = require('express');
const router = require('./routes');

//middlewares
const jwtAuth = require('./middlewares/jwtAuth');

// Définition du port
const port = process.env.PORT || 3000;


// Initialisation de l'app
const app = express();


// urlencoded utile pour avoir les corps de requête
app.use(express.urlencoded({ extended: true }));
// Utile pour avoir un corps de requête valide pour REST Client
app.use(express.json());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(router);

// Lancement du serveur 
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
