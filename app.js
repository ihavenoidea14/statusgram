var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var createpurchase = require('./routes/create-purchase');
var createrefi = require('./routes/create-refi');
var downloads = require('./routes/download');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/purchase', createpurchase);
app.use('/api/v1/refi', createrefi);
app.use('/api/v1/download', downloads);

module.exports = app;