var express = require('express');

var router = express.Router();

var gallrouter = require('./galeria/galeria');

router.use('/galeria', gallrouter);


module.exports = router;
