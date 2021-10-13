const express = require('express');
const controller = require('../../controllers/patients');

const router = express.Router();

router.route('/').get(controller.getPatients);
router.route('/:patientId').get(controller.getPatientById);
router.route('/').post(controller.addPatient);
router.route('/:patientId').delete(controller.deletePatientById);

module.exports = router;