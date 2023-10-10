const Joi = require('joi');

// Validation des données entrées par l'utilisateur

/** //!Syntaxe / méthodes Joi
 * 
 * string() : signifie que la valeur entrée sera obligatoirement une chaîne de caractères.
 * max(255) : signifie que la longueur max. de la chaîne sera 255 caractères. 
 * Les deux méthodes citées précédemment correspondent donc à un type de valeur VARCHAR(255).
 * required() : signifie que la valeur doit obligatoirement être présente. Si le champ n'est pas rempli, on reverra un message d'erreur.
 * =================================================================
 * EMAIL: 
 * minDomainSegments : rerpésente le nombre min. de segments composant l'adresse mail. Par exemple, test@test.com comprend 2 segments. test.test@test.com en comprend 3.
 * tlds : signifie "Top-Level Domains". Il représente les extensions de domaine les plus élevées dans la hiérarchie des noms de domaine.
 * allow : représente les extensions de domaine que l'on va autoriser dans une adresse mail d'utilisateur. Ici, on autorisera .com, .net et .fr .
 * =================================================================
 * validateAsync : c'est la méthode que l'on va exécuter pour vérifier que tous les champs requis sont remplis, et que toutes les données correspondent aux contraintes qu'on leur a imposé dans le schéma.
 */

module.exports = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
    firstName: Joi.string()
        .max(64)
        .required(),
    lastName: Joi.string()
        .max(64)
        .required(),
    address: Joi.string()
        .allow(null, '')
        .max(255),
    zipCode: Joi.number()
        .allow(null, '')
        .integer(),
    city: Joi.string()
        .allow(null, '')
        .max(64),
    country: Joi.string()
        .allow(null, '')
        .max(64),
    phoneNumber: Joi.string()
        .allow(null, '')
        .max(64),
    role: Joi.string()
        .allow(null, '')
        .max(64),
    photoUrl: Joi.string()
        .allow(null, '')
        .max(255),
    siret: Joi.number()
        .allow(null, '')
        .integer(),
    provenance: Joi.string()
        .allow(null, '')
        .max(64),
    commentary: Joi.string()
        .allow(null, '')
});
