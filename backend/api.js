/**
 * Created by Philipp on 19.03.2017.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();

});

app.get('/', function (req, res) {
    res.send('Hellooo World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});