const express = require('express');
const cors = require('cors');
const userController = require('./userController.cjs');
const router = express.Router();

router.use(cors());

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;