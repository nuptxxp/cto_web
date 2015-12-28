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

// Get list of dbs
exports.index = function(req, res) {
    var query = url.parse(req.url, true).query || {};
    var tablename = req.param('table');
    var qtype = req.param("type");
    var uuid = req.param("uuid");
    switch(qtype){
        case 'insert':
            mysql.insert(tablename, uuid, query, function(err, result){
                if( err ){
                    sendMsg(res, 1, "insert error");
                }else{
                    sendMsg(res, 0, "everything ok");
                }
            });
            break;
        case 'update':
            mysql.update(tablename, uuid, query, function(err, result){
                if( err ){
                    sendMsg(res, 1, "update error");
                }else{
                    sendMsg(res, 0, "everything ok");
                }
            });
            break;
        case 'append':
            mysql.query(tablename, uuid, function(err, result){
				console.log(err, result);
                if( result.length === 0 ){
					mysql.insert(tablename, uuid, query, function(insert_err, result){
						if( insert_err ){
							sendMsg(res, 1, "insert error");
						}else{
							sendMsg(res, 0, "insert everything ok");
						}
					});
                }else{
					mysql.update(tablename, uuid, query, function(update_err, result){
						if( update_err ){
							sendMsg(res, 1, "update error");
						}else{
							sendMsg(res, 0, "update everything ok");
						}
					});
                }
            });
            break;
        case 'query':
            mysql.query(tablename, uuid, function(err, result){
				console.log(err, result);
                if( err ){
                    res.json([]);
                }else{
                    res.json(result);
                }
            });
            break;
        default:
            sendMsg(res, 1, "args error");
    }
};
