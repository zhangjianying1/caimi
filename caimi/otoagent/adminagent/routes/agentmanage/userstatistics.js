var express = require('express');
var router = express.Router();
var conn = require('../../config/connection');
router.get('/', function(req, res, next){
    var query = req.query;
    var sql;
    var msg = [];
    // 代理商注册总数
    conn.query('select count(id) AS count from users', function(err, result){
        if (err) {
            console.log(err);
        } else {
           msg.push({name: 'agentcount', count: result[0].count})
            searchYesterday();
        }
    })
    function searchYesterday(){
        // 昨日注册总数
        conn.query('select count(id) AS count from users where to_days(`registertime`)>DATE_SUB(CURDATE(), INTERVAL 1 DAY)', function(err, result){
            if (err) {
                console.log(err);
            } else {
                msg.push({name: 'yesterday', count: result[0].count})
                searchToday();
            }
        })
    }
    function searchToday(){
        // 今天日注册总数
        conn.query('select count(id) AS count from users where to_days(`registertime`) = to_days(now())', function(err, result){
            if (err) {
                console.log(err);
            } else {
                msg.push({name: 'todayRegister', count: result[0].count})
                searchMonth();
            }
        })
    }
    function searchMonth(){
        // 本月注册总数
        conn.query('select count(id) AS count from users where date_sub(curdate(), INTERVAL 30 DAY) <= date(`registertime`)', function(err, result){
            if (err) {
                console.log(err);
            } else {
                msg.push({name: 'thisMonthRegister', count: result[0].count})
                searchProviusMonth();
            }
        })
    }
    function searchProviusMonth(){
        // 上个月注册总数
        conn.query('select count(id) AS count from users where period_diff(date_format(now() , "%Y%m") , date_format(`registertime`, "%Y%m")) =1', function(err, result){
            if (err) {
                console.log(err);
            } else {
                msg.push({name: 'lastMonthRegister', count: result[0].count})
                loginYesterday();

            }
        })
    }
    function loginYesterday(){
        // 昨日登录总数
        conn.query('select count(id) AS count from users where to_days(`logintime`)>DATE_SUB(CURDATE(), INTERVAL 1 DAY)', function(err, result){
            if (err) {
                console.log(err);
            } else {
                msg.push({name: 'yesterdayLogin', count: result[0].count})
                loginToday();
            }
        })
    }
    function loginToday(){
        // 今天日登录总数
        conn.query('select count(id) AS count from users where to_days(`registertime`) = to_days(now())', function(err, result){
            if (err) {
                console.log(err);
            } else {
                msg.push({name: 'todayLogin', count: result[0].count})
                res.end(JSON.stringify({
                    "result": msg,
                    "msg": "success",
                    "code": "0000"
                }))
            }
        })
    }

});
module.exports = router;