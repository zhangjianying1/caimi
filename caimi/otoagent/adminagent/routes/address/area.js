var express = require('express');
var router = express.Router();
var conn = require('../../config/connection');

router.get('/', function(req, res, next){
    var body = req.query;
    var sql;

    if (body.sid) {
        sql = 'select * from area where parent_id="' + body.sid + '"';
        conn.query(sql, function(err, result){
            if (err) {
                console.log(err);
            } else {
                console.log(result)
                res.end(JSON.stringify({
                    "result": result,
                    "msg": 'OK',
                    "code": "0000"
                }))
            }
        })
    } else {
        res.end(JSON.stringify({
            "result": '',
            "msg": 'sid值不正确',
            "code": "2001"
        }))
    }
})
module.exports = router