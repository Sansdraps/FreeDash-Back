const express = require('express');
const router = express.Router();
const registerSchema = require('../validation/user/registerSchema');
const validate = require('../validation');

// Controller
const registerController = require('../controllers/registerController');

// Requête
router.route('/')
    .post(validate('body', registerSchema), registerController.handleRegister);

// Export
module.exports = router;
