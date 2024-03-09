const express = require('express');
const adminCantroller = require('../cantrollers/adminCantroller');
const router = express.Router();

router.get('/details', adminCantroller.adminDetails)

module.exports = router;