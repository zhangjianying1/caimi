/* 登录日志 */
var express = require('express');
var router = express.Router();
var conn = require('../../config/connection')
router.get('/', function(req, res, next){
    var query = req.query;
    var sql = '';

    sql = 'select a.*, b.mobile from loginlog a left join users b on a.agentid=b.sid where ';
    if (query.starttime) {
        if (isWhere(sql)) {
            sql += ' and a.logintime> "' + query.starttime + '"';
        } else {
            sql += 'a.logintime> "' + query.starttime + '"';
        }
    }
    if (query.enttime) {
        if (isWhere(sql)) {
            sql += ' and a.logintime<"' + query.endtime + '"';
        } else {
            sql += 'a.logintime<"' + query.endtime + '"';
        }
    }
    if (query.agentid) {
        if (isWhere(sql)) {
            sql += ' and a.agentid="' + query.agentid + '"';
        } else {
            sql += 'a.agentid="' + query.agentid + '"';
        }
    }

    if (isPlainObject(query)){
        sql = 'select a.*, b.mobile from loginlog a left join users b on a.agentid=b.sid';
    }
    function isPlainObject(obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    }
console.log(sql)
    conn.query(sql, function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.end(JSON.stringify({
                "result": result,
                "msg": "success",
                "code": '0000'
            }))
        }
    })
    function isWhere(str){
        console.log(str)
        var re = /where\s+\w+/;
        console.log(re.exec(str))
        if (re.test(str)) {
            return true;
        }
        return false;
    }
})
module.exports = router;