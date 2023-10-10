const express = require('express');
const router = express.Router();

// Controller
const detailController = require('../controllers/detailController');

// Requêtes
router.get('/missiondetails', detailController.getAllDetails);
router.get('/:missionId/missiondetails', detailController.getDetailsByMissionId);
router.post('/:missionId/missiondetails', detailController.createDetail);
router.patch('/missiondetails/:detailId', detailController.updateDetail);
router.delete('/missiondetails/:detailId', detailController.deleteDetail);

// Export
module.exports = router;
