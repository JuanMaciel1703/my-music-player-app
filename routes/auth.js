var express = require('express');
var router = express.Router();

const AuthController = require('../src/controllers/Auth/AuthController');

router.get('/login', AuthController.login);
router.get('/callback', AuthController.callback);

module.exports = router;