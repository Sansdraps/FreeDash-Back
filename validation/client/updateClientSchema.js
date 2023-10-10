const Joi = require('joi');

// Validation des données entrées par l'utilisateur

module.exports = Joi.object({
    email: Joi.string()
        .allow(null, '')
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
    firstName: Joi.string()
        .allow(null, '')
        .max(64),
    lastName: Joi.string()
        .allow(null, '')
        .max(64),
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
