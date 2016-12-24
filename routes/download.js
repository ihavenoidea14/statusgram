var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.download('./output/StatusGram.pdf');
});

module.exports = router;