var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../mysql');

var pool = db.getPool();

console.log('User Query')

router.get('/getuser', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason : null
    };

    var req_name = req.query.name;
    var req_phone = req.query.phone;

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'SELECT * FROM user WHERE (name = ?) AND (phone = ?)',
                values : [req_name, req_phone]
            }, nextCallback);
        }
    ], function(err, result, fields){
        if(sqlConnection){
            sqlConnection.release();
        }
        if(err){
            err_data.reason = err;
        }
        res_data = result;
        res.send(res_data);
    })
})

router.put('/insertuser', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason : null
    };

    var req_name = req.body.name;
    var req_phone = req.body.phone;

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'INSERT INTO user (name, phone) VALUES (?, ?)',
                values : [req_name, req_phone]
            }, nextCallback);
        }
    ], function(err, result, fields){
        if(sqlConnection){
            sqlConnection.release();
        }
        if(err){
            err_data.reason = err;
            console.log(err_data);
        }
        res_data = result;
        res.send(res_data);
    })
})

module.exports = router;