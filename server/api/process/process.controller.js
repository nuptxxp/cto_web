'use strict';

var _ = require('lodash');
var url = require('url');
var mysql = require('../../mysql');

var sendMsg = function(res, code, msg){
    res.json({
        "code" : code,
        "message" : msg,
    });
};

// Get list of processs
exports.index = function(req, res) {
  var uuid = req.param('uuid');
  var appTablename = 'app_run_time';
  var jobTablename = 'job_run_time';
  mysql.queryMohu(appTablename, uuid, function(err, appResult) {
	if (err) {
		res.json({});
	} else {
  		mysql.queryMohu(jobTablename, uuid, function(err, jobResult) {
			if (err) {
				res.json({});
			} else {
				var resDict = {
					app : appResult,
					job : jobResult
				};
				res.json(resDict);	
			}
		});
	}
  });
};
