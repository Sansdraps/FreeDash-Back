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
    name: Joi.string()
        .max(64)
        .required(),
    startDate: Joi.date()
        .required(),
    endDate: Joi.date()
        .allow(null, ''),
    status: Joi.string()
        .allow(null, '')
        .max(64),
    totalPrice: Joi.number()
        .precision(2)
        .required(),
    tva: Joi.number()
        .precision(2)
        .required(2),
    commentary: Joi.string()
        .allow(null, ''),
    declarate: Joi.boolean()
        .required(),
    clientId: Joi.number()
        .integer()
        .required()
});
