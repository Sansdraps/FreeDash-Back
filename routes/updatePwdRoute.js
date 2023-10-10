const express = require('express');
const router = express.Router();
const validate = require('../validation');
const controllerHandler = require('../middlewares/controllerHandler');
const updatePwdSchema = require('../validation/user/updateUserPwdSchema');

const jwtAuth = require('../middlewares/jwtAuth');

// Controller
const userController = require('../controllers/userController');

// Requêtes

router.route('/')
    .patch(jwtAuth, validate('body', updatePwdSchema), controllerHandler(userController.updateUserPassword));

// Export
module.exports = router;
