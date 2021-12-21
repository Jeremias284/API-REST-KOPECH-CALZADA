const express = require('express');
const { param } = require('express-validator');
const Controller = require('../../controllers/patients');

const router = express.Router();
const { validator } = require('../../middlewares/validate');

router.route('/').get(Controller.getAllPatients);
router
  .route('/:id')
  .get(param('id').isMongoId(), validator, Controller.getPatientById);
router.route('/').post(ValidateStudent, Controller.createPatient);
router
  .route('/:id')
  .delete(param('id').isMongoId(), validator, Controller.deletePatient);
router
  .route('/:id')
  .put(
    param('id').isMongoId(),
    Controller.updatePatient
  );

module.exports = router;
