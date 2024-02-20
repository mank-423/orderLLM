const express = require('express');
const userCantroller = require('../cantrollers/UserCantroller');

const router = express.Router();

router.get("/", userCantroller.getAllUser);
router.post("/register", userCantroller.registerUser);
router.post('/login', userCantroller.loginUser);

module.exports = router;