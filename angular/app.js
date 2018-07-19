var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    fs.readFile('index.html', 'utf8', function(error, data){
        console.log('Open Index');
        response.send(data);
    });
});

app.listen(52273, function(){
    console.log('Sever On');
});