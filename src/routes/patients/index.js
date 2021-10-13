const express = require('express');
const controller = require('../../controllers/patients');

const router = express.Router();

//OBTIENE TODOS LOS ELEMENTOS DE LA COLECCION
router.route('/').get(controller.getPatients);
//OBTIENE EL ELEMENTO CORRESPONDIENTE AL ID INDICADO EN LA REQUEST
router.route('/:patientId').get(controller.getPatientById);
//AGREGA UN ELEMENTO A LA COLECCION
router.route('/').post(controller.addPatient);
//ELIMINA UN ELEMENTO DE LA COLECCION INDICANDO EL ID DEL MISMO
router.route('/:patientId').delete(controller.deletePatientById);

module.exports = router;