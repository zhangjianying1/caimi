var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next){
    var user = req.session.user;
    res.end(JSON.stringify({"msg": "get session Success", "result": user, "code": "0000"}))
})
module.exports = router;