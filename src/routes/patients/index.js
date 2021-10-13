const express = require('express');
const controller = require('../../controllers/patients');

const router = express.Router();

router.route('/').get(controller.getPatients);

module.exports = router;