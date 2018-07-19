var mysql = require('mysql');
var config = require('./appconfig')

// Mysql 연동
var client = mysql.createConnection({
    user: config.mysql.userId,
    password: config.mysql.userPwd
})

console.log('Init Database');

client.query('USE Daydream');