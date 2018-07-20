var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../mysql');

var pool = db.getPool();

console.log('Product Query')

// GET 요청
router.get('/new', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason: null
    };
    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'SELECT * FROM products WHERE del = "N" ORDER BY id DESC'
            }, nextCallback);
            
        }
    ], function(err, result, fields){
        if(sqlConnection){
            sqlConnection.release();
        }
        if(err){
            err_data.reason = err;
            console.log('Error Get Products');
            console.log(err_data.reason);
        }
        res_data = result;
        res.send(res_data);
    });
});

// POST 요청
router.post('/insert', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason: null
    };
    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'INSERT INTO products (name, passwd, phone, mphone, address, exnumber, comment) VALUES(?, ?, ?, ?, ?, ?, ?)',
                values : [req.body.name, req.body.passwd, req.body.phone, req.body.mphone, req.body.address, req.body.exnumber, req.body.comment]
            }, nextCallback);
        }
    ], function(err, result, fields){
        if(sqlConnection){
            sqlConnection.release();
        }
        if(err){
            err_data.reason = err;
            console.log('Error Post Products');
            console.log(err_data.reason);
        }
        console.log('Suceess Post Product in Server');
        res_data = result;
        res.send(res_data);
    })
})

// PUT 요청
router.put('/delete', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason : null
    };

    listId = req.body.listId;

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'UPDATE products SET del = "Y" WHERE id = ?',
                values : listId
            }, nextCallback);
        }
    ], function(err, result, fields){
        if(sqlConnection){
            sqlConnection.release();
        }
        if(err){
            err_data.reason = err;
            console.log('Error Put Products');
            console.log(err_data.reason);
        }
        console.log('Suceess Put Product in Server');
        res_data = result;
        res.send(res_data);
    })
})

module.exports = router;