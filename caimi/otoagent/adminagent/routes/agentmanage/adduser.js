var express = require('express');
var router = express.Router();
console.log(router)
var conn = require('../../config/connection');
router.post('/', function(req, res, next){
    var body = req.body;
    var sql = '';

    var result = true;
    for (var i in body) {
        if (body.hasOwnProperty) {
            if (!body[i]) {
                if (i !== 'area') {
                    result = false;
                    res.end(JSON.stringify({
                        "result": "",
                        "msg": i + "不能为空",
                        "code": '2001'
                    }));
                }

            }
        }
    }
    if (result) {
        var sid = getSid(body, function(sid){
            if (sid) {
                sql = 'insert into users (sid, name, mobile, province, city, area, channeltype, registertime, level, userstatus) values ("' +
                    sid + '","'+ body.name+'","'+ body.mobile+'","' + body.province + '","' +body.city+ '","' +body.area+ '"," ' + body.channeltype+
                    '", now(), "' +body.userlevel+ '","' + body.userstatus+'")'

                conn.query(sql, function(err, result){
                    if (err) {
                        console.log(err);
                    } else {
                        res.end(JSON.stringify({
                            "result": result[0],
                            "msg": "add success",
                            "code": '0000'
                        }));
                    }
                })
            }
        });
    }

    function getSid(body, callback){
        var sid = '';

        if (body.province) {
            sqlProvince();
        }
        function sqlProvince(){
            var sql = 'select sid from province where name="' + body.province + '"';
            conn.query(sql, function(err, result){
                if (err) {
                    console.log(err)
                } else {
                    sid += result[0].sid;
                    if (body.city) {
                        sqlCity();
                    } else {
                        if (callback) callback(sid);
                    }
                }

            });
        }
        /**
         * 查询城市
         */
        function sqlCity(){
            sql = 'select sid from city where name="' + body.city + '"';
            conn.query(sql, function(err, result){
                if (err) {
                    console.log(err)
                } else {
                    sid += result[0].sid;

                    if (body.area) {
                        sqlArea();
                    } else {
                        if (callback) callback(sid);
                    }
                }
            });
        }

        /**
         * 查询地区
         */
        function sqlArea() {
            sql = 'select sid from area where name="' + body.area + '"';
            conn.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    sid += result[0].sid;
                    if (callback) callback(sid);
                }
            })
        }


    }
})

module.exports = router;

