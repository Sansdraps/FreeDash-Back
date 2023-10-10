const Joi = require('joi');

// Validation des données entrées par l'utilisateur

module.exports = Joi.object({
    name: Joi.string()
        .allow(null, '')
        .max(64),
    startDate: Joi.date()
        .allow(null, ''),
    endDate: Joi.date()
        .allow(null, ''),
    status: Joi.string()
        .allow(null, '')
        .max(64),
    totalPrice: Joi.number()
        .allow(null, '')
        .precision(2),
    tva: Joi.number()
        .allow(null, '')
        .precision(2),
    commentary: Joi.string()
        .allow(null, ''),
    declarate: Joi.boolean()
        .allow(null, ''),
    clientId: Joi.number()
        .integer()
});
