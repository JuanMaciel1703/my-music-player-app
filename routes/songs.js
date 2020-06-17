var express = require('express');
var router = express.Router();

const SongController = require('../src/controllers/SongController');

router.get('/suggested', SongController.findSuggested);

module.exports = router;
