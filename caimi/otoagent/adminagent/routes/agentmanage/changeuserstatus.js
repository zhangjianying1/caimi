var express = require('express');
var router = express.Router();
var conn = require('../../config/connection');
router.get('/:to/:id', function(req, res, next){
    var param = req.params;
    var sql;
    console.log(param)
    // 锁定用户
    if (param.to == 'lock') {
        sql = 'update users set userstatus="锁定" where sid="' + param.id+ '"'
        conn.query(sql, function(err, result){
            if (err) {
                console.log(err);
            } else {
                res.end(JSON.stringify({
                    "result": "",
                    "msg": "success",
                    "code": "0000"
                }))
            }
        })
    } else if (param.to === 'action') {
        // 激活用户
        sql = 'update users set userstatus="活动" where sid="' + param.id+ '"'
        conn.query(sql, function(err, result){
            if (err) {
                console.log(err);
            } else {
                res.end(JSON.stringify({
                    "result": "",
                    "msg": "success",
                    "code": "0000"
                }))
            }
        })
    }
})
module.exports = router;