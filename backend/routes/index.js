const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

/* GET home page. */
router.get('/login', authController.getlogin);
router.post('/login', authController.login);
router.post('/register', authController.register);


module.exports = router;
