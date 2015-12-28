'use strict';

var mysql = require('mysql'),
    settings = require('./settings');

var pool = mysql.createPool(settings.mysql);

var sql = {
    insert: function(tablename){
        return 'INSERT INTO ' + tablename + ' SET ?';
    },
    update: function(tablename){
        return 'UPDATE ' + tablename + ' SET ? where uuid = ?';
    },
    query: function(tablename){
        return 'SELECT * FROM ' + tablename + ' where uuid = ?';
    },
	queryMohu: function(tablename, uuid){
		return 'SELECT * FROM ' + tablename + ' where uuid like "' + uuid + '%"';
	},
	queryApp: function(tablename, startTimestamp, endTimestamp) {
		return 'SELECT app_name, count(app_name) as cnt from  `' + tablename + '` where `time` >= "' + startTimestamp + '" and `time` <= "' + endTimestamp + '" group by app_name order by cnt desc'; 
	}
};


module.exports = {
    insert: function(tablename, uuid, data, callback){
        pool.getConnection(function(err, connection){
            if(err){
                console.log('pool connection error:' + err.stack);
            }else{
                data['uuid'] = uuid;
                connection.query(sql.insert(tablename), data, function(err, result){
                    connection.release();
                    callback(err, result);
                });
            }
        });
    },
    update: function(tablename, uuid, data, callback){
        pool.getConnection(function(err, connection){
            if(err){
                console.log('pool connection error:' + err.stack);
            }else{
                connection.query(sql.update(tablename), [data, uuid], function(err, result){
                    connection.release();
                    callback(err, result);
                });
            }
        });
    },
    query: function(tablename, uuid, callback){
        pool.getConnection(function(err, connection){
            if(err){
                console.log('pool connection error:' + err.stack);
            }else{
                connection.query(sql.query(tablename), uuid, function(err, result){
                    connection.release();
                    callback(err, result);
                });
            }
        });
    },
    queryMohu: function(tablename, uuid, callback){
        pool.getConnection(function(err, connection){
            if(err){
                console.log('pool connection error:' + err.stack);
            }else{
                connection.query(sql.queryMohu(tablename, uuid), function(err, result){
                    connection.release();
                    callback(err, result);
                });
            }
        });
    },
    queryApp: function(tablename, startTimestamp, endTimestamp, callback){
        pool.getConnection(function(err, connection){
            if(err){
                console.log('pool connection error:' + err.stack);
            }else{
                connection.query(sql.queryApp(tablename, startTimestamp, endTimestamp), function(err, result){
                    connection.release();
                    callback(err, result);
                });
            }
        });
    }
};

