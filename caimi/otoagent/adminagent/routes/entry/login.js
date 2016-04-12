var express = require('express');
var router = express.Router();
var conn = require('../../config/connection');
/* POST login listing. */
router.post('/', function(req, res, next) {
    var body = req.body;

    if (body.name && body.password) {
        var sql = 'select * from admin where name="' + body.name + '"';

        conn.query(sql, function(err, result){
            if (err) {
                console.log(err);
            } else {
                if (result.length) {
                    if (result[0].password == body.password) {

                        if (!req.session.user) {
                            delete result[0].password;
                            req.session.user = result[0]
                        }
                        res.end(JSON.stringify({
                            "result": {"user": body.name, "sessionid": result[0].id, "role": result[0].role},
                            "code": "0000"
                        }))
                    } else {
                        res.end(JSON.stringify({
                            "result": "",
                            "msg": '密码错误',
                            "code": "2001"
                        }))
                    }
                } else {
                    res.end(JSON.stringify({
                        "result": "",
                        "msg": '用户不存在',
                        "code": "2001"
                    }))
                }

            }
        })
    }
});

module.exports = router;