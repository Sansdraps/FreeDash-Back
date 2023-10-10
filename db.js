// Import de Sequelize
const { Sequelize } = require('sequelize');

require('dotenv').config();

// Connexion à la base de données
const pgUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(pgUrl, {
// underscored_true convertit les valeurs de la base de données en snake_case
  define: {
    underscored: true,
  },
});


module.exports = sequelize;
