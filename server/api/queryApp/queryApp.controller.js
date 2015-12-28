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
// Get list of queryApps
exports.index = function(req, res) {
  var query = url.parse(req.url, true).query || {};
  var startTimestamp = query.starttime || '';
  var endTimestamp = query.endtime || '';
  if(startTimestamp == '' || endTimestamp == '') {
	  sendMsg(res, 1, "args error");
	  return;
  }
  mysql.queryApp('app_start_time', startTimestamp, endTimestamp, function(err, appResult) {
	if (err) {
		res.json({});
	} else {
		res.json(appResult);
	}
  });
};
