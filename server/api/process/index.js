'use strict';

var express = require('express');
var controller = require('./process.controller');

var router = express.Router();

router.get('/:uuid', controller.index);

module.exports = router;
