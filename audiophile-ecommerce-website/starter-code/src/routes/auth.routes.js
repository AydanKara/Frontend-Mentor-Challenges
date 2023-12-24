const express = require('express');

const authController = require("../controllers/auth.controller")

// construct the Router object
const router = express.Router();

router.get('/signup', authController.getSignup);
router.get('/login', authController.getLogin);

module.exports = router;

