const express = require('express');
const router = express.Router();
const validate = require('../validation');
const controllerHandler = require('../middlewares/controllerHandler');
const authSchema = require('../validation/user/authSchema');

// Controller
const authController = require('../controllers/authController');

// Requête
router.route('/')
    .post(validate('body', authSchema), controllerHandler(authController.handleLogin));
    
// router.get('/refreshlogin', authController.handleCheckToken);
// router.post('/refreshlogin', authController.handleRefreshToken);

// Export
module.exports = router;
