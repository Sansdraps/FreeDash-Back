const Joi = require('joi');
const { MissionDetails } = require('../models');

const detailController = {
    getAllDetails : async (req, res) => {
        const foundDetails = await MissionDetails.findAll();

        try {
            res.json(foundDetails);
        } catch (error) {
            res.status(500).send("Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.");
        }
    },
    getDetailsByMissionId: async (req, res) => {
        const { missionId } = req.params;
        
        try {
            const foundDetails = await MissionDetails.findAll({
                where: {
                    missionId
                }
            });

            res.json(foundDetails);
        } catch (error) {
            res.status(500).send("Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.");
        };
    },
    createDetail: async (req, res) => {
        const { description, quantity, price } = req.body;
        const { missionId } = req.params;

        // ================================
        // Joi
        // ================================

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

         const schema = Joi.object({
            description: Joi.string()
                .max(255)
                .required(),
            quantity: Joi.number()
                .required(),
            price: Joi.number()
                .precision(2)
                .required()
        });

        const validatedData = await schema.validateAsync({
            description,
            quantity,
            price,
        });

        // ================================
        //
        // ================================

        try {
            const newDetail = await MissionDetails.create({
                description: validatedData.description,
                quantity: validatedData.quantity,
                price: validatedData.price,
                missionId
            });

            res.status(200).send(`L'étape "${validatedData.description}" a bien été créée. Elle possède l'identifiant ${newDetail.id}.`);
        } catch (error) {
            res.status(500).send("Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.");
        }
    },
    updateDetail: async (req, res) => {
        const { description, quantity, price } = req.body;
        const { detailId } = req.params;

        // ================================
        // Joi
        // ================================

        // Validation des données entrées par l'utilisateur

         const schema = Joi.object({
            description: Joi.string()
                .allow(null, '')
                .max(255),
            quantity: Joi.number()
                .allow(null, ''),
            price: Joi.number()
                .allow(null, '')
                .precision(2)
        });

        const validatedData = await schema.validateAsync({
            description,
            quantity,
            price,
        });

        // ================================
        //
        // ================================

        try {
            const foundDetail = await MissionDetails.findByPk(detailId);

            foundDetail.update({
                description: validatedData.description,
                quantity: validatedData.quantity,
                price: validatedData.price
            });

            res.status(200).send(`L'étape "${validatedData.description}" a bien été modifiée.`);
        } catch (error) {
            res.status(500).send("Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.");
        }
    },
    deleteDetail: async (req, res) => {
        const { detailId } = req.params;
        const foundDetail = await MissionDetails.findByPk(detailId);

        try {
            const detailDelete = await foundDetail.destroy();

            res.status(200).send(`L'étape "${foundDetail.description}" a bien été supprimée.`);
        } catch (error) {
            res.status(500).send("Une erreur serveur est survenue. Veuillez nous excuser pour la gêne occasionnée.");
        }
    }
};

module.exports = detailController;
