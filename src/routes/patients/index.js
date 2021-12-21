const express = require('express');
const { body } = require('express-validator');
const controller = require('../../controllers/patients');


const router = express.Router();
const { validator } = require('../../middlewares/validate');


router
  .route('/login')
  .post(
    body('name', 'Invalid name').isString().trim().notEmpty(),
    body('password', 'Invalid password').isString().trim().notEmpty(),
    validator,
    controller.logIn
  );
router
  .route('/')
  .post(
    body('name', 'Invalid name').isString().trim().notEmpty(),
    body('password', 'Invalid password').isString().trim().notEmpty(),
    validator,
    controller.addPatient
  );


//OBTIENE TODOS LOS ELEMENTOS DE LA COLECCION
router.route('/').get(controller.getPatients);
//OBTIENE UN USUARIO SEGUN ID Y LO MODIFICA
router.route('/:patientId').put(controller.updatePatientById);
//OBTIENE EL ELEMENTO CORRESPONDIENTE AL ID INDICADO EN LA REQUEST
router.route('/:patientId').get(controller.getPatientById);
//AGREGA UN ELEMENTO A LA COLECCION
router.route('/').post(controller.addPatient);
//ELIMINA UN ELEMENTO DE LA COLECCION INDICANDO EL ID DEL MISMO
router.route('/:patientId').delete(controller.deletePatientById);

module.exports = router;