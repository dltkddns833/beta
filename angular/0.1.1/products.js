var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../mysql');

var pool = db.getPool();

console.log('Product Query')

// GET 요청
// Get Products All
router.get('/getlistAll', function(req, res, next){
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
                sql : 'SELECT * FROM products WHERE (del = "N") ORDER BY id DESC'
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
})

// Get Products From userid
router.get('/getlist', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason: null
    };

    req_userid = req.query.userid

    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'SELECT * FROM products WHERE (del = "N") AND (userid = ?) ORDER BY id DESC',
                values : [req_userid]
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

// Get Products From listid
router.get('/getlistid', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason: null
    };

    req_id = req.query.id
    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'SELECT * FROM products WHERE id = ?',
                values : [req_id]
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

// Master Page Get Product From Option
router.get('/getoptionlist', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason: null,
    };

    var option_deposit = req.query.deposit;
    var option_completeEx = req.query.completeEx;
    var option_completeAll = req.query.completeAll;


    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'SELECT * FROM products WHERE (del = "N") AND (deposit = ?) AND (completeEx = ?) AND (completeAll = ?) ORDER BY id DESC',
                values : [option_deposit, option_completeEx, option_completeAll]
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
    })
})

// POST 요청
router.post('/insert', function(req, res, next){
    var sqlConnection;

    var res_data;
    var err_status_code = null;
    var err_data = {
        reason: null
    };
    console.log(req.body)
    async.waterfall([
        function(nextCallback){
            pool.getConnection(nextCallback);
        },
        function(connection, nextCallback){
            sqlConnection = connection;
            sqlConnection.query({
                sql : 'INSERT INTO products (userid, mname, mphone, address, exnumber, contents, comment) VALUES(?, ?, ?, ?, ?, ?, ?)',
                values : [req.body.userid, req.body.mname ,req.body.mphone, req.body.address, req.body.exnumber, req.body.contents, req.body.comment]
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