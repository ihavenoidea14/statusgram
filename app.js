var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PDFDocument = require('pdfkit');
var fs = require('fs');
var creates = require('./routes/create');
var downloads = require('./routes/download');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', creates);
app.use('/download', downloads);

module.exports = app;