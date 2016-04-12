var express = require('express');
var router = express.Router();
var conn = require('../config/connection');
router.get('/', function(req, res){
    res.render('index', {});
})
module.exports = router;