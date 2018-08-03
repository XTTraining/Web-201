'use strict';
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userscontroller');

router.post('/', UsersController.getUsersData);

router.post('/registration', UsersController.registerUser);

router.post('/login', UsersController.loginUser);

module.exports = router;