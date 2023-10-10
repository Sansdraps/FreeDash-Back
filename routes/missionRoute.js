const express = require('express');
const router = express.Router();
const createMissionSchema = require('../validation/mission/createMissionSchema');
const updateMissionSchema = require('../validation/mission/updateMissionSchema');
const validate = require('../validation');
const controllerHandler = require('../middlewares/controllerHandler');

//middlewares
const jwtAuth = require('../middlewares/jwtAuth');
// Controllers
const missionController = require('../controllers/missionController');

// Requêtes
router.route('/')
    .get(jwtAuth, controllerHandler(missionController.getAllMissionsByUserId))
    .post(jwtAuth, validate('body', createMissionSchema), controllerHandler(missionController.createMission));

router.route('/:missionId')
    .get(jwtAuth, controllerHandler(missionController.getOneMissionById))
    .patch(jwtAuth, validate('body', updateMissionSchema), controllerHandler(missionController.updateMission))
    .delete(jwtAuth, controllerHandler(missionController.deleteMission));

router.get('/missions/:clientId', jwtAuth, controllerHandler(missionController.getAllMissionsByClientId));

// Export
module.exports = router;
