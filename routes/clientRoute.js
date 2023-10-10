const express = require('express');
const router = express.Router();
const createClientSchema = require('../validation/client/createClientSchema');
const updateClientSchema = require('../validation/client/updateClientSchema');
const validate = require('../validation');
const controllerHandler = require('../middlewares/controllerHandler');

const jwtAuth = require('../middlewares/jwtAuth');

// Controllers
const clientController = require('../controllers/clientController');

// Requêtes

router.route('/')
    .get(jwtAuth, controllerHandler(clientController.getClientsByUserId))
    .post(jwtAuth, validate('body', createClientSchema), controllerHandler(clientController.createClient));

router.route('/:clientId')
    .get(jwtAuth, controllerHandler(clientController.getOneClientById))
    .patch(jwtAuth, validate('body', updateClientSchema), controllerHandler(clientController.updateClient))
    .delete(jwtAuth, controllerHandler(clientController.deleteClient));


// Export
module.exports = router;
