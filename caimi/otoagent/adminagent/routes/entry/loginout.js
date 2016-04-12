var express = require('express');
var router = express.Router();

/* GET loginout listing. */
router.get('/', function(req, res, next) {
    var user = req.session.user;

    if (user) {
        req.session.user = '';
    }
    res.end(JSON.stringify({"msg": "login out success", "code": "0000"}));
});

module.exports = router;