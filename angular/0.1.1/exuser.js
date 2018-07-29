var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../mysql');

var pool = db.getPool();

console.log('Exuser Query');

router.get('/getexuser', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason : null
    };

    var req_listid = req.query.listid;

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'SELECT * FROM exuser WHERE listid = ?',
                values : [req_listid]
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

router.post('/insertexuser', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason : null
    };

    console.log('POST EXUSER')
    var req_body = req.body;

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'INSERT INTO exuser (listid ,name, nickname, phone, gender, blog) VALUES (?, ?, ?, ?, ?, ?)',
                values : [req_body.listid, req_body.name, req_body.nickname, req_body.phone, req_body.gender, req_body.blog]
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

router.put('/putexuser', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason : null
    };

    console.log('PUT EXUSER')
    var req_body = req.body;

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'UPDATE exuser SET name = ?, nickname = ?, phone = ?, gender = ?, blog = ?, cancel = ?, complete = ? WHERE id = ?',
                values : [req_body.name, req_body.nickname, req_body.phone, req_body.gender, req_body.blog, req_body.cancel, req_body.complete, req_body.listid]
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

router.delete('/deleteexuser', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason : null
    };

    console.log('DELETE EXUSER')
    var req_body = req.query;

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'DELETE  FROM exuser WHERE id = ?',
                values : [req_body.id]
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