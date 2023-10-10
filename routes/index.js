const express = require('express');

const { ApiError } = require('../middlewares/errorHandler');

// Routes non protégées
const registerRoute = require('./registerRoute');
const authRoute = require('./authRoute');

// Routes protégées
const missionRoute = require('./missionRoute');
const clientRoute = require('./clientRoute');
const userRoute = require('./userRoute');
const updatePwdRoute = require('./updatePwdRoute');

const router = express.Router();

router.use('/login', authRoute);
router.use('/register', registerRoute);
router.use('/mission', missionRoute);
router.use('/clients', clientRoute);
router.use('/user', userRoute);
router.use('/updatepassword', updatePwdRoute);
router.use(missionRoute);

// 404
router.use(() => {
    throw new ApiError(404, '404 Not Found');
})

module.exports = router;
