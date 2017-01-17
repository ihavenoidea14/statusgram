'use strict';

var express = require('express');
var router = express.Router();
// var fs = require('fs');

router.get('/', function(req, res) {
  res.download('./output/StatusGram.pdf');

  if (process.env.NODE_ENV === 'Production') {
    res.on('finish', function() {
      fs.unlinkSync('./output/StatusGram.pdf');
    });
  }
  
});

module.exports = router;
