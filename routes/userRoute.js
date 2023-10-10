const express = require('express');
const router = express.Router();
const updateUserSchema = require('../validation/user/updateUserSchema');
const validate = require('../validation');
const controllerHandler = require('../middlewares/controllerHandler');

const jwtAuth = require('../middlewares/jwtAuth');

// Controller
const userController = require('../controllers/userController');

// Requêtes
router.route('/')
    .get(jwtAuth, controllerHandler(userController.getUserInfo))
    .patch(jwtAuth, validate('body', updateUserSchema), controllerHandler(userController.updateUserInfo))
    .delete(jwtAuth, controllerHandler(userController.deleteUser));

// Export
module.exports = router;
