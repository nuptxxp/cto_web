'use strict';

var _ = require('lodash');
var url = require('url');
var mysql = require('../../mysql');

// Get list of inserts
exports.index = function(req, res) {
    var query = url.parse(req.url, true).query || {};
    var appname = query.appname || '';
    var timestamp = query.timestamp || '';
    var tablename = query.tablename || '';
    if( appname === '' || timestamp === '' || tablename === ''){
        res.json({'code':1, 'msg':'args check error'});
        return;
    }
    var connection = mysql.getConnection();
    var sql = 'INSERT INTO  `' + tablename + '` (`id`, `app_name`, `time`) VALUES (NULL, "' + appname + '", "' + timestamp + '")';
    connection.query(sql, function(err, rows, fields){
        if(rows){
            res.json({'code':0, 'msg':'database exec success'});
        }else{
            res.json({'code':1, 'msg':'database exec failed'});
        }
    });
};
