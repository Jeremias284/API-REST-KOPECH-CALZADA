const express = require('express');

const patients = require('./patients');

const users = require('./users');

const router = express.Router();

router.use('/patients',patients);

router.use('/users', users);

module.exports = router;
