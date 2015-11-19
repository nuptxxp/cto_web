'use strict';

var _ = require('lodash');
var url = require('url');
var mysql = require('../../mysql');

// Get list of querys
exports.index = function(req, res) {
    var query = url.parse(req.url, true).query || {};
    var starttime = query.starttime || '';
    var endtime = query.endtime || '';
    if( starttime === '' || endtime === ''){
        res.json([]);
        return;
    }
    var connection = mysql.getConnection();
    var tablename = 'app_start_time';
    var sql = 'select app_name, count(app_name) as cnt from  `' + tablename + '` where `time` >= "' + starttime + '" and `time` <= "' + endtime + '" group by app_name order by cnt desc'; 
    connection.query(sql, function(err, rows, fields){
        res.json(rows);
    });

};
