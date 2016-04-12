var express = require('express');
var router = express.Router();
var conn = require('../../config/connection')

router.get('/', function(req, res, next){
    var query = req.query;
    //每页显示二十条
    var pageSize = 1;
    var p = query.p || 1;
    var empty = false;
    var sql = '';
    for (var i in query) {
        if (query[i] != "undefined") {
            empty = true;
        } else {
            delete query[i];
        }
    }

    if (empty) {
        sql = 'select * from users where province="' + query.province + '" or city="' +  query.city +
            '" or area="' + query.area + '" or channeltype="' + query.channeltype + '" or registerchannel="' +
            query.channeltype+ '" or name="'+ query.agentname +'" or level="' + query.level + '" or softversion="' + query.softversion +
            '" or userstatus="' + query.userstatus + '"';
    } else {
        sql = 'select * from users';
    }

console.log(sql)
    conn.query(sql, function(err, result){
        if (err) {
            console.log(err);
        }
        result.forEach(function(val, i){
            if (val.province){

            }
        })
        res.end(JSON.stringify({
            "result": result,
            "msg": 'success',
            "code": "0000"
        }))
    })

})
module.exports = router;