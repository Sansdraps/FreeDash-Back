const ApiError = require('../errors/apiError');
const logger = require('./logger');

const errorHandler = (error, res) => {
    let { statusCode, message } = error;

    statusCode = statusCode ?? 500;

    if (statusCode === 500) {
        logger.error(error);
        message = 'Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.';
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};

module.exports = {
    ApiError,
    errorHandler
};
