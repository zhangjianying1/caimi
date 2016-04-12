var express = require('express');
var router = express.Router();
var crypto = require('../utils/crypto');
var https = require('https');
/* GET home page. */
router.get('/', function(req, res, next) {
    var body = req.query;
    var signature = body.signature;
    var timestamp = body.timestamp;
    var nonce = body.nonce;
    var echostr = body.echostr;
    var token = 'qbtest';

    // 微信验证请求
    if (signature && timestamp) {
        var arr = [token, timestamp, nonce].sort();
        var result = crypto.sha1(arr.join(''))
conosle.log(arr)
        if (result == signature){
            res.end(echostr);
        }

    } else {  //普通请求
        var session = req.session;
        session.b='f';
        res.render('index', {signature: session.signature, timestamp: session.timeStamp})

    }

});

module.exports = router;
