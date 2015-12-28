'use strict';

var express = require('express');
var controller = require('./db.controller');

var router = express.Router();

router.get('/:type/:table/:uuid', controller.index);

module.exports = router;
