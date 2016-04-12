var express = require('express');
var router = express.Router();
var conn = require('../../config/connection');

router.get('/', function(req, res, next){
    var body = req.body;
    var sql;

    sql = 'select * from province';
    console.log(sql)
    conn.query(sql, function(err, result){
        if (err) {
            console.log(err);
        } else {

            res.end(JSON.stringify({
                "result": result,
                "msg": 'OK',
                "code": "0000"
            }))
        }
    })


})
module.exports = router