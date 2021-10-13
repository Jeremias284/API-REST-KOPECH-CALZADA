const express = require('express');

const router = express.Router();

router.route('/').get(()=>{console.log("Succerssful get")});

module.exports = router;