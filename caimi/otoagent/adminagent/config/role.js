
exports.isAuthority = function(req, res, next) {
    var user = req.session.user;
    var role = user.role;
    if (role < 10) {
        res.redirect('/');
    }
    next();
}
/**
 * session 是否过期
 */
exports.isOverdue = function(req, res, next) {
    var user = req.session.user;

    if (!user) {
        res.statusCode = '401';
        res.end(JSON.stringify({"msg": "session已过期", "code": "2001"}));
    }
    next();
}