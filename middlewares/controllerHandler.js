const { ApiError } = require("./errorHandler");

module.exports = (controller) => async (req, res, next) => {
    try {
        await controller(req, res);
    } catch (error) {
        res.status(500).send("Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.");
    }
};
