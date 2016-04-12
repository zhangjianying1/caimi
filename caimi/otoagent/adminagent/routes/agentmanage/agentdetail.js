var express = require('express');
var router = express.Router();
var conn = require('../../config/connection');
router.get('/', function(req, res, next){
    var query = req.query;
    var sql = '';
    console.log(req)
    if (query.id) {
        sql = 'select * from users a left join (select * from loginlog where agentid="'+ query.id +'" order by id desc limit 1) b on (a.sid=b.agentid) where a.sid="' + query.id + '" or a.logintime';
        console.log(sql);
        conn.query(sql, function(err, result){
            if (err) {
                console.log(err)
            } else {
                delete result[0].password;
                res.end(JSON.stringify({
                    "result": result[0],
                    "msg": "success",
                    "code": "0000"
                }));
            }
        })
    }
})
module.exports = router;