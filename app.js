var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var createpurchase = require('./routes/create-purchase');
var createrefi = require('./routes/create-refi');
var createlistagent = require('./routes/create-listagent');
var createsellingagent = require('./routes/create-sellingagent');
var download = require('./routes/download');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/purchase', createpurchase);
app.use('/api/v1/refi', createrefi);
app.use('/api/v1/listing', createlistagent);
app.us('/api/v1/selling', createsellingagent);
app.use('/api/v1/download', download);

module.exports = app;
