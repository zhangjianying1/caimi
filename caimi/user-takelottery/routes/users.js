var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring')
/* GET users listing. */
router.get('/', function(req, res, next) {
    var options = {
        hostname: 'https://api.weixin.qq.com',
        port: 80,
        path: '/cgi-bin/qrcode/create?access_token=TOKEN',
        method: 'POST'
    };
    var content = {"expire_seconds": 604800, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": 123}}};

    var request = https.request(options, function(res) {

        res.on('data', function (chunk) {
            console.log(chunk)
            req.end('fd')

        });

    });

//    request.write(querystring.stringify(content))
    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    request.end()

});

module.exports = router;
