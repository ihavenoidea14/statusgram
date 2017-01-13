var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var creates = require('./routes/create');
var downloads = require('./routes/download');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', creates);
app.use('/download', downloads);

module.exports = app;