var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var conn = require('../config/connection');
router.post('/', function(req, res){
	var body = req.body;
    var sql;
    var password;
    console.log(body)
    if (body.name && body.password) {
        var md5 = crypto.createHash('md5');
        md5.update(body.password);
        password = md5.digest('hex');
        console.log(password)
        sql = 'select * from users where name="' + body.name + '"'
        conn.query(sql, function(err, result){
            if (err) {
                console.log(err);
            } else {

                if (result.length) {
                    if (result[0].password === password) {
                        delete result.password;

                        res.end(JSON.stringify({
                            "result": result,
                            "msg": "登录成功",
                            "code": "0000"
                        }))
                        // 插入登录日志
                       sql = 'insert into loginlog (agentid, logintime, loginchannel, softversion, devicename, devicecode, system) values ("' +
                           result[0].sid+ '",now(), "山东体彩", "v1.0", "安卓", "f3fdfd33333", "安卓4.0")';
                        conn.query( sql, function(err, result){
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(result)
                            }

                        })
                    } else {
                        res.end(JSON.stringify({
                            "result": "",
                            "msg": "密码错误",
                            "code": "2001"
                        }))
                    }
                } else {
                    res.end(JSON.stringify({
                        "result": "",
                        "msg": "用户不存在",
                        "code": "2001"
                    }))
                }
            }
        })
    } else {
        res.end(JSON.stringify({
            "result": "",
            "msg": "用户名或密码为空",
            "code": "2001"
        }))
    }
})
module.exports = router;